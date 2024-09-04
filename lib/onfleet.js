// Define constants for default values
const DEFAULT_URL = 'https://onfleet.com';
const DEFAULT_PATH = '/api';
const DEFAULT_API_VERSION = '/v2';
const DEFAULT_TIMEOUT = 70000;

import * as constants from './constants.js';
import * as util from './util.js';
import { ValidationError } from './error.js';
import packageData from '../package.json' assert { type: 'json' };

import Admins from './resources/Administrators.js';
import Containers from './resources/Containers.js';
import Destinations from './resources/Destinations.js';
import Hubs from './resources/Hubs.js';
import Organization from './resources/Organization.js';
import Recipients from './resources/Recipients.js';
import Tasks from './resources/Tasks.js';
import Teams from './resources/Teams.js';
import Workers from './resources/Workers.js';
import Webhooks from './resources/Webhooks.js';
import CustomFields from './resources/CustomFields.js';

const { name, version } = packageData;

const resources = {
  Admins,
  Administrators: Admins,
  Containers,
  Destinations,
  Hubs,
  Organization,
  Recipients,
  Tasks,
  Teams,
  Workers,
  Webhooks,
  CustomFields,
};

class Onfleet {
  headers = {};

  constructor(
    apiKey,
    userTimeout = DEFAULT_TIMEOUT,
    bottleneckOptions = null,
    baseURL = DEFAULT_URL,
    defaultPath = DEFAULT_PATH,
    defaultApiVersion = DEFAULT_API_VERSION,
  ) {
    if (!apiKey) {
      throw new ValidationError('Onfleet API key not found, please obtain an API key from your organization admin');
    }
    if (userTimeout > DEFAULT_TIMEOUT) {
      throw new ValidationError(`User-defined timeout has to be shorter than ${DEFAULT_TIMEOUT}ms`);
    }

    this.apiKey = apiKey;
    this.api = {
      baseUrl: `${baseURL}${defaultPath}${defaultApiVersion}`,
      timeout: userTimeout,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `${name}-${version}`,
        Authorization: `Basic ${util.encode(apiKey)}`,
      },
    };

    this.limiterSettings = this.initBottleneckOptions(bottleneckOptions || {});

    this.resources = resources;
    this.initResources();
  }

  get customHeaders() {
    return this.headers;
  }

  set customHeaders(headers) {
    this.headers = headers;
    this.api.headers = { ...this.api.headers, ...headers };
  }

  initBottleneckOptions({
    LIMITER_RESERVOIR = constants.LIMITER_RESERVOIR,
    LIMITER_WAIT_UPON_DEPLETION = constants.LIMITER_WAIT_UPON_DEPLETION,
    LIMITER_MAX_CONCURRENT = constants.LIMITER_MAX_CONCURRENT,
    LIMITER_MIN_TIME = constants.LIMITER_MIN_TIME,
  }) {
    return {
      reservoir: LIMITER_RESERVOIR,
      waitUponDepletion: LIMITER_WAIT_UPON_DEPLETION,
      maxConcurrent: LIMITER_MAX_CONCURRENT,
      minTime: LIMITER_MIN_TIME,
    };
  }

  initResources() {
    Object.entries(resources).forEach(([name, Resource]) => {
      const endpoint = name.toLowerCase();
      this[endpoint] = new Resource(this);
    });
  }

  async verifyKey() {
    return await util.authenticate(this.api);
  }
}

export default Onfleet;
