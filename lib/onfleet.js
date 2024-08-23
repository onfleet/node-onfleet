// Define constants for default values
const DEFAULT_URL = 'https://onfleet.com';
const DEFAULT_PATH = '/api';
const DEFAULT_API_VERSION = '/v2';
const DEFAULT_TIMEOUT = 70000;

// Import required modules
import * as constants from './constants.js';
import * as util from './util.js';
import { ValidationError } from './error.js';
import packageData from '../package.json' assert { type: 'json' };

// Import resources as ES modules
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

// Create resources mapping as an object
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

/**
 * @desc Onfleet object initiates all the resources
 */
class Onfleet {
  get customHeaders() {
    return this.headers;
  }

  set customHeaders(headers) {
    this.headers = headers;
    this.api.headers = { ...this.api.headers, ...this.customHeaders };
  }

  constructor(
    apiKey,
    userTimeout,
    bottleneckOptions,
    baseURL = DEFAULT_URL,
    defaultPath = DEFAULT_PATH,
    defaultApiVersion = DEFAULT_API_VERSION,
  ) {
    if (!apiKey) {
      throw new ValidationError('Onfleet API key not found, please obtain an API key from your organization admin');
    }
    if (userTimeout > 70000) {
      throw new ValidationError('User-defined timeout has to be shorter than 70000ms');
    } else {
      this.apiKey = apiKey;
      this.api = {
        baseUrl: `${baseURL}${defaultPath}${defaultApiVersion}`,
        timeout: userTimeout || DEFAULT_TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `${name}-${version}`,
          Authorization: `Basic ${util.encode(apiKey)}`,
        },
      };
      if (bottleneckOptions) {
        Onfleet.initBottleneckOptions(bottleneckOptions);
      }

      this.resources = resources;
      this.initResources();
    }
  }

  static initBottleneckOptions(bottleneckOptions) {
    const {
      LIMITER_RESERVOIR,
      LIMITER_WAIT_UPON_DEPLETION,
      LIMITER_MAX_CONCURRENT,
      LIMITER_MIN_TIME,
    } = bottleneckOptions;

    if (Number.isInteger(LIMITER_RESERVOIR) && LIMITER_RESERVOIR > 0 && LIMITER_RESERVOIR !== constants.LIMITER_RESERVOIR) {
      constants.LIMITER_RESERVOIR = LIMITER_RESERVOIR;
    }

    if (Number.isInteger(LIMITER_WAIT_UPON_DEPLETION) && LIMITER_WAIT_UPON_DEPLETION > 0 && LIMITER_WAIT_UPON_DEPLETION !== constants.LIMITER_WAIT_UPON_DEPLETION) {
      constants.LIMITER_WAIT_UPON_DEPLETION = LIMITER_WAIT_UPON_DEPLETION;
    }

    if (Number.isInteger(LIMITER_MAX_CONCURRENT) && LIMITER_MAX_CONCURRENT !== constants.LIMITER_MAX_CONCURRENT && LIMITER_MAX_CONCURRENT > 0) {
      constants.LIMITER_MAX_CONCURRENT = LIMITER_MAX_CONCURRENT;
    }

    if (Number.isInteger(LIMITER_MIN_TIME) && LIMITER_MIN_TIME > 0 && LIMITER_MIN_TIME !== constants.LIMITER_MIN_TIME) {
      constants.LIMITER_MIN_TIME = LIMITER_MIN_TIME;
    }
  }

  initResources() {
    // Initialize resources dynamically
    for (let name in resources) {
      const endpoint = name.toLowerCase();
      this[endpoint] = new resources[name](this);
    }
  }

  verifyKey() {
    // Utility function to authenticate the API key
    return util.authenticate(this.api);
  }
}

// Export the Onfleet class as the default export
export default Onfleet;
