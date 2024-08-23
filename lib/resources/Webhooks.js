import Resource from '../Resource.js';

/**
 * @desc this class holds the CRUD methods allowed on the Webhooks endpoint
 */

export default class Webhooks extends Resource {
  constructor(api) {
    super(api);
    this.defineTimeout();
    this.endpoints({
      create: {
        path: '/webhooks',
        method: 'POST',
      },
      get: {
        path: '/webhooks',
        method: 'GET',
      },
      deleteOne: {
        path: '/webhooks/:webhookId',
        method: 'DELETE',
      },
    });
  }
}
