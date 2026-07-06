import * as chai from 'chai';
import { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import * as util from '../lib/util.js';
import Onfleet from '../lib/onfleet.js';
import response from './response.js';

const baseUrl = 'https://onfleet.com/api/v2';
const apiKey = '<your_api_key>';
const newTeam = {
  name: 'Onfleet Team',
  workers: [
    '1LjhGUWdxFbvdsTAAXs0TFos',
    'F8WPCqGmQYWpCkQ2c8zJTCpW',
  ],
  managers: [
    'Mrq7aKqzPFKX22pmjdLx*ohM',
  ],
  hub: 'tKxSfU7psqDQEBVn5e2VQ~*O',
};
const etaDetail = {
  dropoffLocation: '101.627378,3.1403995',
  pickupLocation: '101.5929671,3.1484824',
  pickupTime: '1620965258',
};
const completionDetail = {
  completionDetails: {
    success: true,
    notes: 'Forced complete by Onfleet Wrapper',
  },
};
const updateDetail = {
  name: 'Stephen Curry',
  phone: '+18883133131',
};

const deliveryManifestObject = {
  hubId: 'kyfYe*wyVbqfomP2HTn5dAe1~*O',
  workerId: 'kBUZAb7pREtRn*8wIUCpjnPu',
  googleApiKey: '<google_direction_api_key>',
  startDate: '1455072025000',
  endDate: '1455072025000',
};

const createCustomField = {
  model: 'Task',
  field: [{
    description: 'this is a test',
    asArray: false,
    visibility: [
      'admin',
      'api',
      'worker',
    ],
    editability: [
      'admin',
      'api',
    ],
    key: 'test',
    name: 'test',
    type: 'single_line_text_field',
    contexts: [
      {
        isRequired: false,
        conditions: [],
        name: 'save',
      },
    ],
    value: 'order 123',
  }],
  integration: 'shopify',
};

chai.use(chaiAsPromised);

describe('Utility functions testing', () => {
  it('encode should encode an API key as expected', () => {
    assert.equal(util.encode(response.apiKey), response.encodedApiKey);
  });
  it('replaceWithID should replace ID as expected', () => {
    assert.equal(util.replaceWithId(response.url, response.id), response.pathById);
  });
  it('replaceWithEndpointAndParam should replace endpoint and parameter as expected', () => {
    assert.equal(util.replaceWithEndpointAndParam(response.url, 'phone', response.phone), response.pathWithEndpoint);
  });
  it('appendQueryParameters should append parameters correctly', () => {
    assert.equal(
      util.appendQueryParameters(response.baseUrl, response.parameters),
      response.pathWithQuery,
    );
  });
  it('isQueryParam should return the right boolean', () => {
    assert.equal(util.isQueryParam(response.parameters), true);
    assert.equal(util.isQueryParam(response.url), false);
  });
});

describe('Utility function testing - Auth test returns 200 ok', () => {
  nock(baseUrl)
    .get('/auth/test')
    .reply(200, response.auth);
  it('authenticate endpoint', () => util.authenticate({
    baseUrl,
    headers: {
      authorization: 'Basic some_token',
    },
  })
    .then((res) => {
      assert.equal(res, response.auth.status === 200);
    }));
});

describe('Initial testing', () => {
  it('without bottleneck options', () => {
    const onfleet = new Onfleet(apiKey);
    assert.equal(onfleet.limiterSettings.maxConcurrent, 1);
    assert.equal(onfleet.limiterSettings.minTime, 50);
    assert.equal(onfleet.limiterSettings.waitUponDepletion, 10000);
    assert.equal(onfleet.limiterSettings.reservoir, 20);
  });

  it('with bottleneck options', () => {
    const onfleet = new Onfleet(apiKey, undefined, {
      LIMITER_RESERVOIR: 10,
      LIMITER_WAIT_UPON_DEPLETION: 20000,
      LIMITER_MAX_CONCURRENT: 5,
      LIMITER_MIN_TIME: 10,
    });
    assert.equal(onfleet.limiterSettings.maxConcurrent, 5);
    assert.equal(onfleet.limiterSettings.minTime, 10);
    assert.equal(onfleet.limiterSettings.waitUponDepletion, 20000);
    assert.equal(onfleet.limiterSettings.reservoir, 10);
  });
});

describe('HTTP Request testing', () => {
  const onfleet = new Onfleet(apiKey);
  beforeEach(() => {
    nock(baseUrl)
      .get((uri) => uri.includes('admins'))
      .reply(200, response.list);
    nock(baseUrl)
      .get((uri) => uri.includes('tasks'))
      .reply(200, response.get);
    nock(baseUrl)
      .get((uri) => uri.includes('recipients'))
      .reply(200, response.getRecipients);
    nock(baseUrl)
      .post((uri) => uri.includes('teams'))
      .reply(200, response.createTeams);
    nock(baseUrl)
      .get((uri) => uri.includes('teams'))
      .reply(200, response.getWorkerEta);
    nock(baseUrl)
      .post((uri) => uri.includes('complete'))
      .reply(200, response.forceComplete);
    nock(baseUrl)
      .put((uri) => uri.includes('workers'))
      .reply(200, response.updateWorkers);
    nock(baseUrl)
      .delete((uri) => uri.includes('tasks'))
      .reply(200, response.deleteTask);
    nock(baseUrl)
      .get((uri) => uri.includes('teams/K3FXFtJj2FtaO2~H60evRrDc/tasks'))
      .reply(200, response.getTeamUnassignedTasks);
    nock(baseUrl)
      .get((uri) => uri.includes('workers/ZxcnkJi~79nonYaMTQ960Mg2/tasks'))
      .reply(200, response.getWorkerAssignedTasks);
    nock(baseUrl)
      .get((uri) => uri.includes('tasks/batch/Qrx5VCHwYoPhWP9f35JzY87m'))
      .reply(200, response.getBatchByBachId);
    nock(baseUrl)
      .post((uri) => uri.includes('integrations'))
      .reply(200, response.getManifestProvider);
    nock(baseUrl)
      .get((uri) => uri.includes('customFields'))
      .reply(200, response.getCustomFields);
    nock(baseUrl)
      .post((uri) => uri.includes('customFields'))
      .reply(200, response.createCustomFields);
  });

  it('Get function', () => onfleet.administrators.get()
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res[0].email, 'james@onfleet.com');
      assert.equal(res[0].type, 'super');
      assert.equal(res[1].email, 'wrapper@onfleet.com');
      assert.equal(res[1].type, 'standard');
    }));

  it('Get function - by ID', () => onfleet.tasks.get('SxD9Ran6pOfnUDgfTecTsgXd')
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.id, 'SxD9Ran6pOfnUDgfTecTsgXd');
      assert.equal(res.notes, 'Onfleet API Wrappers!');
    }));

  it('Get function - by ShortId', () => onfleet.tasks.get('44a56188', 'shortId')
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.shortId, '44a56188');
      assert.equal(res.trackingURL, 'https://onf.lt/44a56188');
    }));

  it('Get function - by phone number', () => onfleet.recipients.get('+18881787788', 'phone')
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.phone, '+18881787788');
      assert.equal(res.skipSMSNotifications, false);
    }));

  it('Get function - by name', () => onfleet.recipients.get('Onfleet Rocks', 'name')
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.name, 'Onfleet Rocks');
    }));

  it('Create function', () => onfleet.teams.create(newTeam)
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.name, 'Onfleet Team');
    }));

  it('Get function - worker eta of team', () => onfleet.teams.getWorkerEta('SxD9Ran6pOfnUDgfTecTsgXd', etaDetail)
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.steps[0].arrivalTime, 1621339297);
    }));

  it('Force complete a task', () => onfleet.tasks.forceComplete('6Fe3qqFZ0DDwsM86zBlHJtlJ', completionDetail)
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.status, 200);
      assert.equal(res.completionDetails.notes, 'Forced complete by Onfleet Wrapper');
    }));

  it('Update a worker', () => onfleet.workers.update('Mdfs*NDZ1*lMU0abFXAT82lM', updateDetail)
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.name, 'Stephen Curry');
      assert.equal(res.phone, '+18883033030');
    }));

  it('Delete a task', () => onfleet.tasks.deleteOne('AqzN6ZAq*qlSDJ0FzmZIMZz~')
    .then((res) => {
      expect(typeof res).to.equal('number');
      assert.equal(res, 200);
    }));

  it('Get unassigned tasks in a team', () => onfleet.teams.getTasks('K3FXFtJj2FtaO2~H60evRrDc')
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.tasks.length, 1);
      assert.equal(res.tasks[0].id, '3VtEMGudjwjjM60j7deSI123');
    }));

  it('Get assigned tasks for a worker', () => onfleet.workers.getTasks('ZxcnkJi~79nonYaMTQ960Mg2')
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.tasks.length, 1);
      assert.equal(res.tasks[0].id, '3VtEMGudjwjjM60j7deSI987');
    }));

  it('Get compliance information from tasks assigned to Onfleet drivers', () => onfleet.workers.getDeliveryManifest(deliveryManifestObject)
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.manifestDate, 1694199600000);
      assert.equal(res.turnByTurn.length, 1);
    }));

  it('Get custom fields', () => onfleet.customfields.get({ integration: 'shopify' })
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.fields.length, 1);
    }));

  it('Create custom field', () => onfleet.customfields.create(createCustomField)
    .then((res) => {
      assert.equal(res, 200);
    }));
});

describe('Additional resource coverage', () => {
  const onfleet = new Onfleet(apiKey);
  const hubId = 'tKxSfU7psqDQEBVn5e2VQ~*O';
  const destinationId = '9qcJpfoqLwDppaZO8wYPFfsT';
  const containerTeamId = 'K3FXFtJj2FtaO2~H60evRrDc';
  const routePlanId = 'aBcDeFgHiJkLmNoPqRsTuVwX';
  const webhookId = '2bcSv6Qd~OpvThCqkcdrq6w0';

  // The Methods module uses a single, module-level Bottleneck limiter whose
  // reservoir is only replenished when a response carries x-ratelimit-remaining.
  // Returning it here keeps the shared reservoir topped up so the suite does not
  // deplete it and start waiting (which would time the tests out).
  const rateLimitHeaders = { 'x-ratelimit-remaining': '100' };

  beforeEach(() => {
    // Start from a clean slate so interceptors from previous suites do not leak.
    nock.cleanAll();

    // Hubs
    nock(baseUrl)
      .get((uri) => uri.includes('hubs'))
      .reply(200, response.getHubs, rateLimitHeaders);
    nock(baseUrl)
      .post((uri) => uri.includes('hubs'))
      .reply(200, response.createHub, rateLimitHeaders);
    nock(baseUrl)
      .put((uri) => uri.includes('hubs'))
      .reply(200, response.updateHub, rateLimitHeaders);

    // Destinations (metadata match registered first so it wins over plain create)
    nock(baseUrl)
      .post((uri) => uri.includes('destinations/metadata'))
      .reply(200, response.matchDestinations, rateLimitHeaders);
    nock(baseUrl)
      .post((uri) => uri.includes('destinations'))
      .reply(200, response.createDestination, rateLimitHeaders);
    nock(baseUrl)
      .get((uri) => uri.includes('destinations'))
      .reply(200, response.getDestination, rateLimitHeaders);

    // Containers
    nock(baseUrl)
      .get((uri) => uri.includes('containers'))
      .reply(200, response.getContainer, rateLimitHeaders);

    // Organization
    nock(baseUrl)
      .get((uri) => uri.includes('organization'))
      .reply(200, response.getOrganization, rateLimitHeaders);

    // Route plans
    nock(baseUrl)
      .post((uri) => uri.includes('routePlans'))
      .reply(200, response.createRoutePlan, rateLimitHeaders);
    nock(baseUrl)
      .get((uri) => uri.includes('routePlans'))
      .reply(200, response.getRoutePlan, rateLimitHeaders);
    nock(baseUrl)
      .put((uri) => uri.includes('routePlans'))
      .reply(200, response.updateRoutePlan, rateLimitHeaders);
    nock(baseUrl)
      .delete((uri) => uri.includes('routePlans'))
      .reply(200, response.deleteTask, rateLimitHeaders);

    // Webhooks
    nock(baseUrl)
      .post((uri) => uri.includes('webhooks'))
      .reply(200, response.createWebhook, rateLimitHeaders);
    nock(baseUrl)
      .get((uri) => uri.includes('webhooks'))
      .reply(200, response.getWebhooks, rateLimitHeaders);
    nock(baseUrl)
      .delete((uri) => uri.includes('webhooks'))
      .reply(200, response.deleteTask, rateLimitHeaders);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  // Hubs
  it('Hubs - list hubs', () => onfleet.hubs.get()
    .then((res) => {
      expect(Array.isArray(res)).to.equal(true);
      assert.equal(res[0].name, 'Downtown Hub');
    }));

  it('Hubs - create a hub', () => onfleet.hubs.create({ name: 'Downtown Hub' })
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.id, hubId);
      assert.equal(res.name, 'Downtown Hub');
    }));

  it('Hubs - update a hub', () => onfleet.hubs.update(hubId, { name: 'Uptown Hub' })
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.name, 'Uptown Hub');
    }));

  // Destinations
  it('Destinations - create a destination', () => onfleet.destinations.create({
    address: { number: '543', street: 'Howard Street', city: 'San Francisco' },
  })
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.id, destinationId);
      assert.equal(res.address.street, 'Howard Street');
    }));

  it('Destinations - get a destination by ID', () => onfleet.destinations.get(destinationId)
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.id, destinationId);
    }));

  it('Destinations - match metadata', () => onfleet.destinations.matchMetadata([
    { name: 'hello', type: 'string', value: 'world' },
  ])
    .then((res) => {
      expect(Array.isArray(res)).to.equal(true);
      assert.equal(res[0].id, destinationId);
    }));

  // Containers
  it('Containers - get a container by team', () => onfleet.containers.get(containerTeamId, 'teams')
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.type, 'TEAM');
      assert.equal(res.team, containerTeamId);
    }));

  // Organization
  it('Organization - get own organization', () => onfleet.organization.get()
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.name, 'Onfleet Organization');
      assert.equal(res.country, 'US');
    }));

  // Route plans
  it('Route plans - create a route plan', () => onfleet.routeplan.create({ name: 'My Route Plan' })
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.id, routePlanId);
      assert.equal(res.state, 'PENDING');
    }));

  it('Route plans - get a route plan by ID', () => onfleet.routeplan.get(routePlanId)
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.id, routePlanId);
      assert.equal(res.state, 'PLANNED');
    }));

  it('Route plans - update a route plan', () => onfleet.routeplan.update(routePlanId, { name: 'Updated Route Plan' })
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.name, 'Updated Route Plan');
    }));

  it('Route plans - delete a route plan', () => onfleet.routeplan.deleteOne(routePlanId)
    .then((res) => {
      expect(typeof res).to.equal('number');
      assert.equal(res, 200);
    }));

  // Webhooks
  it('Webhooks - list webhooks', () => onfleet.webhooks.get()
    .then((res) => {
      expect(Array.isArray(res)).to.equal(true);
      assert.equal(res[0].id, webhookId);
    }));

  it('Webhooks - create a webhook', () => onfleet.webhooks.create({
    url: 'https://www.example.com/onfleet', trigger: 0,
  })
    .then((res) => {
      expect(typeof res).to.equal('object');
      assert.equal(res.id, webhookId);
      assert.equal(res.isEnabled, true);
    }));

  it('Webhooks - delete a webhook', () => onfleet.webhooks.deleteOne(webhookId)
    .then((res) => {
      expect(typeof res).to.equal('number');
      assert.equal(res, 200);
    }));
});

describe('Error handling testing', () => {
  const onfleet = new Onfleet(apiKey);

  afterEach(() => {
    nock.cleanAll();
  });

  const errorBody = (error, message = 'Something went wrong') => ({
    message: {
      message,
      error,
      cause: null,
      request: null,
    },
  });

  it('ValidationError - constructing without an API key', () => {
    expect(() => new Onfleet()).to.throw(Error).with.property('name', 'ValidationError');
  });

  it('RateLimitError - error code 2300 raises a RateLimitError, not a TypeError', () => {
    nock(baseUrl)
      .post((uri) => uri.includes('tasks'))
      .reply(429, errorBody(2300, 'Rate limit exceeded'));

    return expect(onfleet.tasks.create({}))
      .to.be.rejected
      .then((error) => {
        expect(error).to.not.be.instanceOf(TypeError);
        assert.equal(error.name, 'RateLimitError');
        assert.equal(error.message, 'Rate limit exceeded');
      });
  });

  it('PermissionError - error code in the 1100-1108 range raises a PermissionError', () => {
    nock(baseUrl)
      .post((uri) => uri.includes('tasks'))
      .reply(403, errorBody(1104, 'Insufficient permissions'));

    return expect(onfleet.tasks.create({}))
      .to.be.rejected
      .then((error) => {
        expect(error).to.not.be.instanceOf(TypeError);
        assert.equal(error.name, 'PermissionError');
        assert.equal(error.message, 'Insufficient permissions');
      });
  });

  it('ServiceError - error code >= 2500 raises a ServiceError', () => {
    nock(baseUrl)
      .post((uri) => uri.includes('tasks'))
      .reply(500, errorBody(2500, 'Internal service error'));

    return expect(onfleet.tasks.create({}))
      .to.be.rejected
      .then((error) => {
        expect(error).to.not.be.instanceOf(TypeError);
        assert.equal(error.name, 'ServiceError');
        assert.equal(error.message, 'Internal service error');
      });
  });

  it('ServiceError - error code 2218 (Auto-Dispatch precondition) raises a ServiceError', () => {
    nock(baseUrl)
      .post((uri) => uri.includes('tasks'))
      .reply(412, errorBody(2218, 'Auto-Dispatch precondition failed'));

    return expect(onfleet.tasks.create({}))
      .to.be.rejected
      .then((error) => {
        expect(error).to.not.be.instanceOf(TypeError);
        assert.equal(error.name, 'ServiceError');
        assert.equal(error.message, 'Auto-Dispatch precondition failed');
      });
  });

  it('HttpError - any other error code raises a generic HttpError', () => {
    nock(baseUrl)
      .post((uri) => uri.includes('tasks'))
      .reply(400, errorBody(1000, 'Bad request'));

    return expect(onfleet.tasks.create({}))
      .to.be.rejected
      .then((error) => {
        expect(error).to.not.be.instanceOf(TypeError);
        assert.equal(error.name, 'HttpError');
        assert.equal(error.message, 'Bad request');
      });
  });
});
