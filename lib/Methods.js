/* eslint-disable no-console */
import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';
import * as constants from './constants.js';
import * as util from './util.js';
import {
  HttpError,
  PermissionError,
  RateLimitError,
  ServiceError,
} from './error.js';

// Create new rate limiter using defined constants
const limiter = new Bottleneck({
  reservoir: constants.LIMITER_RESERVOIR,
  maxConcurrent: constants.LIMITER_MAX_CONCURRENT,
  minTime: constants.LIMITER_MIN_TIME,
});

// Rate reservoir refresh on every response
// New rate is determined by x-ratelimit-remaining in headers
const reassignRate = (newRate) => {
  if (newRate > 0) {
    limiter.updateSettings({
      reservoir: newRate,
    });
  }
};

const wait = async (ms) => {
  console.log('Waiting due to rate limiting');
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// On reservoir depletion, we wait 10000ms and reset the rate again (20 req/second limitation)
limiter.on('depleted', async (empty) => {
  if (!empty) {
    await wait(constants.LIMITER_WAIT_UPON_DEPLETION);
    reassignRate(constants.LIMITER_RESERVOIR);
  }
});

/**
 * The Method Factory
 * @desc configures the actual method for each CRUD operations
 * @returns a promise containing the response from an HTTP request
 */

const Methods = async (key, api, ...args) => {
  const {
    path,
    altPath,
    method,
    queryParams,
    deliveryManifestObject,
    timeoutInMilliseconds,
  } = key;
  const operations = method; // Instead of using ['method'], we directly assign `method`
  let url = `${api.api.baseUrl}${path}`;
  let body = '';
  let hasBody = false;

  // No arguments
  if (args.length === 0 && operations === 'GET' && altPath) {
    url = `${api.api.baseUrl}${altPath}`;
  }
  
  // 1 or more arguments
  if (args.length >= 1 && ['GET', 'DELETE', 'PUT'].includes(operations)) {
    if (['name', 'shortId', 'phone', 'workers', 'organizations', 'teams'].includes(args[1])) {
      url = util.replaceWithEndpointAndParam(url, args[1], args[0]);
    } else if (util.isBase64Encoded(args[0])) {
      url = util.replaceWithId(url, args[0]);
    } else {
      url = `${api.api.baseUrl}${altPath}`;
    }

    if (operations === 'PUT') {
      body = args[1];
      hasBody = true;
    }
  }
  if (['PUT', 'DELETE'].includes(operations) && url.includes('customFields') && Array.isArray(args)) {
    body = args[0]; // eslint-disable-line
    hasBody = true;
  }
  // POST Prep - 3 different cases
  if (operations === 'POST') {
    if (util.isBase64Encoded(args[0])) {
      url = util.replaceWithId(url, args[0]);
      if (args[1]) {
        body = args[1];
        hasBody = true;
      }
    } else {
      body = args[0];
      hasBody = true;
    }
  }

  // Query Params extension
  if (queryParams) {
    for (const element of args) {
      if (util.isQueryParam(element)) {
        url = util.appendQueryParameters(url, element);
      }
    }
  }

  // Reference https://docs.onfleet.com/reference/delivery-manifest
  if (deliveryManifestObject && args && args.length > 0) {
    args.forEach((item) => {
      if (item.hubId && item.workerId) {
        body = {
          path: `providers/manifest/generate?hubId=${item.hubId}&workerId=${item.workerId}`,
          method: "GET",
        };
        hasBody = true;
      }
      if (item.googleApiKey) {
        api.api.headers["X-API-Key"] = `Google ${item.googleApiKey}`;
      }
      if (item.startDate || item.endDate) {
        const queryParams = {};
        if (item.startDate) queryParams.startDate = item.startDate;
        if (item.endDate) queryParams.endDate = item.endDate;
        url = util.appendQueryParameters(url, queryParams);
      }
    });
  }

  // Send the HTTP request through the rate limiter
  try {
    const res = await limiter.schedule(() => fetch(url, {
      method: operations,
      headers: api.api.headers,
      timeout: timeoutInMilliseconds,
      body: hasBody ? JSON.stringify(body) : undefined,
    }));

    // For every request, we compare the reservoir with the remaining rate limit in the header
    const reservoir = await limiter.currentReservoir();
    const rateLimitRemaining = res.headers.get('x-ratelimit-remaining');
    if (reservoir < rateLimitRemaining) {
      reassignRate(rateLimitRemaining);
    }

    if (res.ok) {
      if (operations === 'DELETE') {
        return res.status;
      }
      return res.json().catch(() => res.status);
    }

    const error = await res.json();
    const errorCode = error.message.error;
    const errorInfo = [
      error.message.message,
      errorCode,
      error.message.cause,
      error.message.request,
    ];

    if (errorCode === 2300) {
      throw new RateLimitError(...errorInfo);
    } else if (errorCode >= 1100 && errorCode <= 1108) {
      throw new PermissionError(...errorInfo);
    } else if (errorCode >= 2500) {
      throw new ServiceError(...errorInfo);
    } else if (errorCode === 2218) { // Precondition error for Auto-Dispatch
      throw new ServiceError(...errorInfo);
    }
    throw new HttpError(...errorInfo);

  } catch (error) {
    throw error;
  }
};

export default Methods;
