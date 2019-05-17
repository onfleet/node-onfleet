const Resource = require('../Resource');

/**
 * @desc this class holds the CRUD methods allowed on the Organization endpoint
 */

class Organization extends Resource {
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

module.exports = Organization;
