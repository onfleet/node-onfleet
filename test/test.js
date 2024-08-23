/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable arrow-body-style */
/* eslint-env mocha */
import { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import * as util from '../lib/util.js';
import Onfleet from '../lib/onfleet.js';
import response from './response.js';
import { LIMITER_MAX_CONCURRENT, LIMITER_MIN_TIME, LIMITER_WAIT_UPON_DEPLETION, LIMITER_RESERVOIR } from '../lib/constants.js';

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
  endDate: '1455072025000'
};

const createCustomField = {
  model: 'Task',
  field: [{
    "description": "this is a test",
    "asArray": false,
    "visibility": [
      "admin",
      "api",
      "worker"
    ],
    "editability": [
      "admin",
      "api"
    ],
    "key": "test",
    "name": "test",
    "type": "single_line_text_field",
    "contexts": [
      {
        "isRequired": false,
        "conditions": [],
        "name": "save"
      }
    ],
    "value": "order 123"
  }],
  integration: "shopify"
}

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
    assert.equal(util.appendQueryParameters(response.baseUrl, response.parameters), response.pathWithQuery);
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
  it('authenticate endpoint', () => {
    return util.authenticate({
      baseUrl: baseUrl,
      headers: {
        authorization: 'Basic some_token',
      },
    })
    .then((res) => {
      assert.equal(res, response.auth.status === 200);
    });
  });
});

describe('Initial testing', () => {
  it('without bottleneck options', () => {
    const onfleet = new Onfleet(apiKey);
    assert.equal(LIMITER_MAX_CONCURRENT, 1);
    assert.equal(LIMITER_MIN_TIME, 50);
    assert.equal(LIMITER_WAIT_UPON_DEPLETION, 10000);
    assert.equal(LIMITER_RESERVOIR, 20);
  });

  it('with bottleneck options', () => {
    const onfleet = new Onfleet(apiKey, undefined, {
      LIMITER_RESERVOIR: 10,
      LIMITER_WAIT_UPON_DEPLETION: 20000,
      LIMITER_MAX_CONCURRENT: 5,
      LIMITER_MIN_TIME: 10,
    });
    assert.equal(LIMITER_MAX_CONCURRENT, 5);
    assert.equal(LIMITER_MIN_TIME, 10);
    assert.equal(LIMITER_WAIT_UPON_DEPLETION, 20000);
    assert.equal(LIMITER_RESERVOIR, 10);
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

  it('Get function', () => {
    return onfleet.administrators.get()
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res[0].email, 'james@onfleet.com');
        assert.equal(res[0].type, 'super');
        assert.equal(res[1].email, 'wrapper@onfleet.com');
        assert.equal(res[1].type, 'standard');
      });
  });

  it('Get function - by ID', () => {
    return onfleet.tasks.get('SxD9Ran6pOfnUDgfTecTsgXd')
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.id, 'SxD9Ran6pOfnUDgfTecTsgXd');
        assert.equal(res.notes, 'Onfleet API Wrappers!');
      });
  });

  it('Get function - by ShortId', () => {
    return onfleet.tasks.get('44a56188', 'shortId')
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.shortId, '44a56188');
        assert.equal(res.trackingURL, 'https://onf.lt/44a56188');
      });
  });

  it('Get function - by phone number', () => {
    return onfleet.recipients.get('+18881787788', 'phone')
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.phone, '+18881787788');
        assert.equal(res.skipSMSNotifications, false);
      });
  });

  it('Get function - by name', () => {
    return onfleet.recipients.get('Onfleet Rocks', 'name')
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.name, 'Onfleet Rocks');
      });
  });

  it('Create function', () => {
    return onfleet.teams.create(newTeam)
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.name, 'Onfleet Team');
      });
  });

  it('Get function - worker eta of team', () => {
    return onfleet.teams.getWorkerEta('SxD9Ran6pOfnUDgfTecTsgXd', etaDetail)
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.steps[0].arrivalTime, 1621339297);
      });
  });

  it('Force complete a task', () => {
    return onfleet.tasks.forceComplete('6Fe3qqFZ0DDwsM86zBlHJtlJ', completionDetail)
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.status, 200);
        assert.equal(res.completionDetails.notes, 'Forced complete by Onfleet Wrapper');
      });
  });

  it('Update a worker', () => {
    return onfleet.workers.update('Mdfs*NDZ1*lMU0abFXAT82lM', updateDetail)
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.name, 'Stephen Curry');
        assert.equal(res.phone, '+18883033030');
      });
  });

  it('Delete a task', () => {
    return onfleet.tasks.deleteOne('AqzN6ZAq*qlSDJ0FzmZIMZz~')
      .then((res) => {
        expect(typeof res).to.equal('number');
        assert.equal(res, 200);
      });
  });

  it('Get unassigned tasks in a team', () => {
    return onfleet.teams.getTasks('K3FXFtJj2FtaO2~H60evRrDc')
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.tasks.length, 1);
        assert.equal(res.tasks[0].id, '3VtEMGudjwjjM60j7deSI123');
      });
  });

  it('Get assigned tasks for a worker', () => {
    return onfleet.workers.getTasks('ZxcnkJi~79nonYaMTQ960Mg2')
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.tasks.length, 1);
        assert.equal(res.tasks[0].id, '3VtEMGudjwjjM60j7deSI987');
      });
  });

  it('Get compliance information from tasks assigned to Onfleet drivers', () => {
    return onfleet.workers.getDeliveryManifest(deliveryManifestObject)
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.manifestDate, 1694199600000);
        assert.equal(res.turnByTurn.length, 1);
      });
  });

  it('Get custom fields', () => {
    return onfleet.customfields.get({ integration: "shopify" })
      .then((res) => {
        expect(typeof res).to.equal('object');
        assert.equal(res.fields.length, 1);
      });
  });

  it('Create custom field', () => {
    return onfleet.customfields.create(createCustomField)
      .then((res) => {
        assert.equal(res, 200);
      });
  });
});
