/* eslint-disable no-console */
const Bottleneck = require('bottleneck');
const fetch = require('node-fetch');
const constants = require('./constants');
const util = require('./util');
const {
  HttpError,
  PermissionError,
  RateLimitError,
  ServiceError,
} = require('./error');

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

const wait = (ms) => {
  console.log('Waiting due to rate limiting');
  // eslint-disable-next-line no-new
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// On reservoir depletion, we wait 10000ms and reset the rate again (20 req/second limitation)
limiter.on('depleted', (empty) => {
  if (!empty) {
    wait(constants.LIMITER_WAIT_UPON_DEPLETION).then(() => {
      reassignRate(constants.LIMITER_RESERVOIR);
    });
  }
});

/**
 * The Method Factory
 * @desc configures the actual method for each CRUD operations
 * @returns a promise containing the response from an HTTP request
 */

const Methods = (key, api, ...args) => {
  const {
    path,
    altPath,
    method,
    queryParams,
    timeoutInMilliseconds,
  } = key;
  const operations = { method }['method']; // eslint-disable-line
  let url = `${api.api.baseUrl}${path}`;
  let body = '';
  let hasBody = false;

  // No arguments
  if (args.length === 0 && operations === 'GET' && altPath) {
    url = `${api.api.baseUrl}${altPath}`;
  }
  // 1 or more arguments
  if (args.length >= 1 && ['GET', 'DELETE', 'PUT'].includes(operations)) {
    // If the 2nd argument is part of this array, this is a new endpoint
    // This covers get(id, params) and insertTask(id, params)
    if (['name', 'shortId', 'phone', 'workers', 'organizations', 'teams'].includes(args[1])) {
      url = util.replaceWithEndpointAndParam(url, args[1], args[0]);
    // If the 1st argument is a base 64 encoded ID, replaces URL path with ID
    // This covers get(id), update(id), and deleteOne(id)
    } else if (util.isBase64Encoded(args[0])) {
      url = util.replaceWithId(url, args[0]);
    // Else, use the alternate path
    // This covers get() with no parameters passed in
    } else {
      url = `${api.api.baseUrl}${altPath}`;
    }
    // PUT Prep covering update(id, body)
    // Second argument should be the body of the request, first arg is ID
    if (operations === 'PUT') {
      body = args[1]; // eslint-disable-line
      hasBody = true;
    }
  }
  // POST Prep - 3 different cases
  if (operations === 'POST') {
    if (util.isBase64Encoded(args[0])) { // forceComplete, clone, and autoDispatch (with ID)
      url = util.replaceWithId(url, args[0]);
      if (args[1]) { // forceComplete and autoDispatch (with ID, has body)
        body = args[1]; // eslint-disable-line
        hasBody = true;
      }
    } else { // create, batchCreate, matchMetadata, and autoAssign (no ID, has body)
      body = args[0]; // eslint-disable-line
      hasBody = true;
    }
  }
  // Query Params extension
  if (queryParams) {
    for (let element of args) { // eslint-disable-line
      if (util.isQueryParam(element)) {
        url = util.appendQueryParameters(url, element);
      }
    }
  }

  // Send the HTTP request through the rate limiter
  return limiter.schedule(() => fetch(url, {
    method: operations,
    headers: api.api.headers,
    timeout: timeoutInMilliseconds,
    body: hasBody ? JSON.stringify(body) : undefined,
  }))
  .then((res) => {

    // For every request, we compare the reservoir with the remainding rate limit in the header
    limiter.currentReservoir()
      .then((reservoir) => {
        if (reservoir < res.headers.get('x-ratelimit-remaining')) {
          reassignRate(res.headers.get('x-ratelimit-remaining'));
        }
      });

    if (res.ok) {
      // Return status code for deletion as the API does, else, return the body of the response
      if (operations === 'DELETE') {
        return res.status;
      }
      return res.json().catch(() => res.status);
    }

    return res.json().then((error) => {
      // Throws custom error according to errorCode
      const errorCode = error.message.error;
      const errorInfo = [
        error.message.message,
        errorCode,
        error.message.cause,
        error.message.request,
      ];
      if (errorCode === 2300) {
        throw new RateLimitError(errorInfo[0], errorInfo[1], errorInfo[2], errorInfo[3]);
      } else if (errorCode <= 1108 && errorCode >= 1100) {
        throw new PermissionError(errorInfo[0], errorInfo[1], errorInfo[2], errorInfo[3]);
      } else if (errorCode >= 2500) {
        throw new ServiceError(errorInfo[0], errorInfo[1], errorInfo[2], errorInfo[3]);
      } else if (errorCode === 2218) { // Precondition error for Auto-Dispatch
        throw new ServiceError(errorInfo[0], errorInfo[1], errorInfo[2], errorInfo[3]);
      }
      // All others, throw general HTTP error
      throw new HttpError(errorInfo[0], errorInfo[1], errorInfo[2], errorInfo[3]);
    });

  })
  .catch((error) => {
    throw (error);
  });
};

module.exports = Methods;
