import Resource from '../Resource.js';

/**
 * @desc this class holds the CRUD methods allowed on the Hubs endpoint
 */

export default class Hubs extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      create: {
        path: '/hubs',
        method: 'POST',
      },
      get: {
        path: '/hubs',
        method: 'GET',
      },
      update: {
        path: '/hubs/:hubId',
        method: 'PUT',
      },
    });
  }
}
