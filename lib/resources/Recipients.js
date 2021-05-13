const Resource = require('../Resource');

/**
 * @desc this class holds the CRUD methods allowed on the Recipients endpoint
 */

class Recipients extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      create: {
        path: '/recipients',
        method: 'POST',
      },
      get: {
        path: '/recipients/:recipientId',
        method: 'GET',
        queryParams: true,
      },
      matchMetadata: {
        path: '/recipients/metadata',
        method: 'POST',
      },
      update: {
        path: '/recipients/:recipientId',
        method: 'PUT',
      },
    });
  }
}

module.exports = Recipients;
