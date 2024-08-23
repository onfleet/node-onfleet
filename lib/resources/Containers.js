import Resource from '../Resource.js';

/**
 * @desc this class holds the CRUD methods allowed on the Containers endpoint
 */

export default class Containers extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      get: {
        path: '/containers/:param/:containerId',
        method: 'GET',
      },
    });
  }
};
