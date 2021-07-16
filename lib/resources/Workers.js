const Resource = require('../Resource');

/**
 * @desc this class holds the CRUD methods allowed on the Workers endpoint
 */

class Workers extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      create: {
        path: '/workers',
        method: 'POST',
      },
      get: {
        path: '/workers/:workerId',
        altPath: '/workers',
        method: 'GET',
        queryParams: true,
      },
      getByLocation: {
        path: '/workers/location',
        altPath: '/workers/location',
        method: 'GET',
        queryParams: true,
      },
      update: {
        path: '/workers/:workerId',
        method: 'PUT',
      },
      deleteOne: {
        path: '/workers/:workerId',
        method: 'DELETE',
      },
      insertTask: {
        path: '/containers/workers/:workerId',
        method: 'PUT',
      },
      getSchedule: {
        path: '/workers/:workerId/schedule',
        method: 'GET',
      },
      setSchedule: {
        path: '/workers/:workerId/schedule',
        method: 'POST',
      },
      matchMetadata: {
        path: '/workers/metadata',
        method: 'POST',
      },
    });
  }
}

module.exports = Workers;
