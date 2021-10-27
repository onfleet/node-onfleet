const DEFAULT_URL = 'https://onfleet.com';
const DEFAULT_PATH = '/api';
const DEFAULT_API_VERSION = '/v2';
const DEFAULT_TIMEOUT = 70000;

const constants = require('./constants');
const util = require('./util');
const { ValidationError } = require('./error');
const { name, version } = require('../package.json');

// Create resources mapping under global-require eslint rule
const resources = {};
resources.Admins = require('./resources/Administrators');
resources.Administrators = require('./resources/Administrators');
resources.Containers = require('./resources/Containers');
resources.Destinations = require('./resources/Destinations');
resources.Hubs = require('./resources/Hubs');
resources.Organization = require('./resources/Organization');
resources.Recipients = require('./resources/Recipients');
resources.Tasks = require('./resources/Tasks');
resources.Teams = require('./resources/Teams');
resources.Workers = require('./resources/Workers');
resources.Webhooks = require('./resources/Webhooks');

/**
 * @desc Onfleet object initiates all the resources
 */

class Onfleet {
  constructor(apiKey, userTimeout, bottleneckOptions, baseURL = DEFAULT_URL, defaultPath = DEFAULT_PATH, defaultApiVersion = DEFAULT_API_VERSION) {
    if (!apiKey) {
      throw new ValidationError('Onfleet API key not found, please obtain an API key from your organization admin');
    } 
    if (userTimeout > 70000) {
      throw new ValidationError('User-defined timeout has to be shorter than 70000ms');
    } else {
      this.apiKey = apiKey;
      this.api = {
        baseUrl: `${baseURL}${defaultPath}${defaultApiVersion}`,
        // eslint-disable-next-line no-unneeded-ternary
        timeout: (userTimeout ? userTimeout : DEFAULT_TIMEOUT),
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `${name}-${version}`,
          Authorization: `Basic ${util.encode(apiKey)}`,
        },
      };
      if (bottleneckOptions) {
        this.initBottleneckOptions(bottleneckOptions)
      }
      
      this.resources = resources;
      this.initResources();
    }
  }

  initBottleneckOptions(bottleneckOptions) {
    const { 
      LIMITER_RESERVOIR,
      LIMITER_WAIT_UPON_DEPLETION,
      LIMITER_MAX_CONCURRENT,
      LIMITER_MIN_TIME,
    } = bottleneckOptions;
    if (Number.isInteger(LIMITER_RESERVOIR) && 
      LIMITER_RESERVOIR > 0 && 
      LIMITER_RESERVOIR !== constants.LIMITER_RESERVOIR) {
      constants.LIMITER_RESERVOIR = LIMITER_RESERVOIR;
    }
    if (Number.isInteger(LIMITER_WAIT_UPON_DEPLETION) && 
      LIMITER_WAIT_UPON_DEPLETION > 0 &&
      LIMITER_WAIT_UPON_DEPLETION !== constants.LIMITER_WAIT_UPON_DEPLETION) {
      constants.LIMITER_WAIT_UPON_DEPLETION = LIMITER_WAIT_UPON_DEPLETION;
    }
    if (Number.isInteger(LIMITER_MAX_CONCURRENT) && 
      LIMITER_MAX_CONCURRENT !== constants.LIMITER_MAX_CONCURRENT &&
      LIMITER_MAX_CONCURRENT > 0) {
        constants.LIMITER_MAX_CONCURRENT = LIMITER_MAX_CONCURRENT;
      }
    if (Number.isInteger(LIMITER_MIN_TIME) &&
      LIMITER_MIN_TIME > 0 &&
      LIMITER_MIN_TIME !== constants.LIMITER_MIN_TIME) {
      constants.LIMITER_MIN_TIME = LIMITER_MIN_TIME;
    }
  }

  initResources() {
    for (let name in resources) { // eslint-disable-line 
      const endpoint = name.toLowerCase();
      this[endpoint] = new resources[name](this);
    }
  }

  verifyKey() {
  // Utility function to authenticate the API key
    return util.authenticate(this.apiKey);
  }
}

module.exports = Onfleet;
