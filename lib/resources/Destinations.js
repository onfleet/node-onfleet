const Resource = require('../Resource');

/**
 * @desc this class holds the CRUD methods allowed on the Destinations endpoint
 */

class Destinations extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      create: {
        path: '/destinations',
        method: 'POST',
      },
      get: {
        path: '/destinations/:destinationId',
        method: 'GET',
      },
      matchMetadata: {
        path: '/destinations/metadata',
        method: 'POST',
      },
    });
  }
}

module.exports = Destinations;
