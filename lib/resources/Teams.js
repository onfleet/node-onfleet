const Resource = require('../Resource');

/**
 * @desc this class holds the CRUD methods allowed on the Teams endpoint
 */

class Teams extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      create: {
        path: '/teams',
        method: 'POST',
      },
      get: {
        path: '/teams/:teamId',
        altPath: '/teams',
        method: 'GET',
      },
      update: {
        path: '/teams/:teamId',
        method: 'PUT',
      },
      insertTask: {
        path: '/containers/teams/:teamId',
        method: 'PUT',
      },
      deleteOne: {
        path: '/teams/:teamId',
        method: 'DELETE',
      },
      autoDispatch: {
        path: '/teams/:teamId/dispatch',
        method: 'POST',
      },
      getWorkerEta: {
        path: '/teams/:teamId/estimate',
        method: 'GET',
        queryParams: true,
      },
    });
  }
}

module.exports = Teams;
