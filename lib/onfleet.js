const DEFAULT_URL = 'https://onfleet.com';
const DEFAULT_PATH = '/api';
const DEFAULT_API_VERSION = 'v2';
const DEFAULT_TIMEOUT = 70000;

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
  constructor(apiKey, userTimeout) {
    if (!apiKey) {
      throw new ValidationError('Onfleet API key not found, please obtain an API key from your organization admin');
    } if (userTimeout > 70000) {
      throw new ValidationError('User-defined timeout has to be shorter than 70000ms');
    } else {
      this.apiKey = apiKey;
      this.api = {
        baseUrl: `${DEFAULT_URL}${DEFAULT_PATH}/${DEFAULT_API_VERSION}`,
        // eslint-disable-next-line no-unneeded-ternary
        timeout: (userTimeout ? userTimeout : DEFAULT_TIMEOUT),
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `${name}-${version}`,
          Authorization: `Basic ${util.encode(apiKey)}`,
        },
      };
      this.resources = resources;
      this.initResources();
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
