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
    this.timeoutInMilliseconds = timeout ?? this.api.api.timeout;
  }

  endpoints(params) {
    /**
     * @desc Initiates all the methods set in each resource configuration
     * @param params is the configuration parsed in from each API endpoint
     */
    Object.entries(params).forEach(([key, value]) => {
      this[key] = (...args) => methods(value, this.api, ...args);
      this[key].timeoutInMilliseconds = this.timeoutInMilliseconds;
    });
  }
}

export default Resource;
