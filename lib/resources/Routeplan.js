import Resource from '../Resource.js';

/**
 * @desc this class holds the CRUD methods allowed on the Tasks endpoint
 */

export default class Routeplan extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      create: {
        path: '/routePlans',
        method: 'POST',
      },
      get: {
        path: '/routePlans/:routePlanId',
        altPath: '/routePlans',
        method: 'GET',
        queryParams: true,
      },
      update: {
        path: '/routePlans/:routePlanId',
        method: 'PUT',
      },
      addTasksToRoutePlan:{
        path:'/routePlans/:routePlansId/tasks',
        method:'PUT',
      },
      deleteOne: {
        path: '/routePlans/:routePlanId',
        method: 'DELETE',
      }
    });
  }
}
