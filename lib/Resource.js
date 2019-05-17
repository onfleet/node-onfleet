const methods = require('./Methods');

/**
 * @desc Resource class initiates all CRUD operations
 */

class Resource {
  constructor(api) {
    this.api = api;
    this.timeoutInMilliseconds = null;
  }

  defineTimeout(timeout) {
    /**
     * @desc defines the timeout value of the endpoint
     * if none is specified, uses the default API timeout
     */
    const preferredTimeout = timeout || this.api.api.timeout;
    this.timeoutInMilliseconds = preferredTimeout;
  }

  endpoints(params) {
    /**
     * @desc initiates all the methods set in each resource configuration
     * @param params is the configuration parsed in from each API endpoint
     */
    for (let key in params) { // eslint-disable-line
      this[key] = params[key];
      this[key].timeoutInMilliseconds = this.timeoutInMilliseconds;
      // Create functions for each method
      this[key] = (...args) => { // eslint-disable-line
        return methods(params[key], this.api, ...args);
      };
    }
  }
}

module.exports = Resource;
