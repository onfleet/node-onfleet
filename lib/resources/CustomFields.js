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
        method: 'POST',
      },
      get: {
        path: '/customFields/:modelName',
        altPath: '/customFields/task',
        method: 'GET',
      },
      update: {
        path: '/customFields',
        method: 'PUT',
      },
      delete: {
        path: '/customFields',
        method: 'DELETE',
      },
    });
  }
}

module.exports = CustomFields;
