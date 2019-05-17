const Resource = require('../Resource');

/**
 * @desc this class holds the CRUD methods allowed on the Hubs endpoint
 */

class Hubs extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      get: {
        path: '/hubs',
        method: 'GET',
      },
    });
  }
}

module.exports = Hubs;
