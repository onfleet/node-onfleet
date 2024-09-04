import Resource from '../Resource.js';

/**
 * @desc this class holds the CRUD methods allowed on the Workers endpoint
 */

export default class Workers extends Resource {
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
      getTasks: {
        path: '/workers/:workerId/tasks',
        method: 'GET',
        queryParams: true,
      },
      getDeliveryManifest: {
        path: '/integrations/marketplace',
        method: 'POST',
        deliveryManifestObject: true,
      },
      matchMetadata: {
        path: '/workers/metadata',
        method: 'POST',
      },
    });
  }
}
