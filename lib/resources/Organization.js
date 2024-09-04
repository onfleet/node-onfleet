import Resource from '../Resource.js';

/**
 * @desc this class holds the CRUD methods allowed on the Organization endpoint
 */

export default class Organization extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      get: {
        path: '/organizations/:orgId',
        altPath: '/organization',
        method: 'GET',
      },
      insertTask: {
        path: '/containers/organizations/:orgId',
        method: 'PUT',
      },
    });
  }
}
