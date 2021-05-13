const Resource = require('../Resource');

/**
 * @desc this class holds the CRUD methods allowed on the Tasks endpoint
 */

class Tasks extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      create: {
        path: '/tasks',
        method: 'POST',
      },
      get: {
        path: '/tasks/:taskId',
        altPath: '/tasks/all',
        method: 'GET',
        queryParams: true,
      },
      update: {
        path: '/tasks/:taskId',
        method: 'PUT',
      },
      deleteOne: {
        path: '/tasks/:taskId',
        method: 'DELETE',
      },
      clone: {
        path: '/tasks/:taskId/clone',
        method: 'POST',
      },
      forceComplete: {
        path: '/tasks/:taskId/complete',
        method: 'POST',
      },
      batchCreate: {
        path: '/tasks/batch',
        method: 'POST',
      },
      autoAssign: {
        path: '/tasks/autoAssign',
        method: 'POST',
      },
      matchMetadata: {
        path: '/tasks/metadata',
        method: 'POST',
      },
    });
  }
}

module.exports = Tasks;
