const Resource = require('../Resource');

/**
 * @desc this class holds the CRUD methods allowed on the Administrators endpoint
 */

class Administrators extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      create: {
        path: '/admins',
        method: 'POST',
      },
      get: {
        path: '/admins',
        method: 'GET',
      },
      update: {
        path: '/admins/:adminId',
        method: 'PUT',
      },
      deleteOne: {
        path: '/admins/:adminId',
        method: 'DELETE',
      },
      matchMetadata: {
        path: '/admins/metadata',
        method: 'POST',
      },
    });
  }
}

module.exports = Administrators;
