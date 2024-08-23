import methods from './Methods.js';

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
     * @desc Defines the timeout value of the endpoint
     * If none is specified, uses the default API timeout
     */
    const preferredTimeout = timeout || this.api.api.timeout;
    this.timeoutInMilliseconds = preferredTimeout;
  }

  endpoints(params) {
    /**
     * @desc Initiates all the methods set in each resource configuration
     * @param params is the configuration parsed in from each API endpoint
     */
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        this[key] = params[key];
        this[key].timeoutInMilliseconds = this.timeoutInMilliseconds;
        // Create functions for each method
        this[key] = (...args) => {
          return methods(params[key], this.api, ...args);
        };
      }
    }
  }
}

export default Resource;
