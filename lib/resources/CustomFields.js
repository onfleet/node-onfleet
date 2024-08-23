const Resource = require('../Resource');

/**
 * @desc this class holds the CRUD methods allowed on the Custom Fields endpoint
 */

class CustomFields extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      create: {
        path: '/customFields',
        altPath: '/customFields',
        method: 'POST',
      },
      get: {
        path: '/customFields/:modelName',
        altPath: '/customFields/Task',
        method: 'GET',
        queryParams: true,
      },
      update: {
        path: '/customFields',
        altPath: '/customFields',
        method: 'PUT',
      },
      delete: {
        path: '/customFields',
        altPath: '/customFields',
        method: 'DELETE',
      },
    });
  }
}

module.exports = CustomFields;
