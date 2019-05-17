/* eslint-disable arrow-body-style */
/* eslint-env mocha */
const chai = require('chai');
const { assert, expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');

const util = require('../lib/util');
const Onfleet = require('../lib/onfleet');
const response = require('./response');

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

chai.should();
chai.use(chaiAsPromised);

describe('Utility functions testing', () => {
  it('encode shoulde encode an API key as expected', () => {
    assert.equal(util.encode(response.apiKey), response.encodedApiKey);
  });
  it('replaceWithID should replace ID as expected', () => {
    assert.equal(util.replaceWithId(response.url, response.id), response.pathById);
  });
  it('replaceWithEndpointAndParam should replace endpoint and parameter as expected', () => {
    assert.equal(util.replaceWithEndpointAndParam(response.url, 'phone', response.phone), response.pathWithEndpoint);
  });
  it('appendQueryParameters should append paramters correctly', () => {
    // eslint-disable-next-line max-len
    assert.equal(util.appendQueryParameters(response.baseUrl, response.parameters), response.pathWithQuery);
  });
  it('isQueryParam should return the right boolean', () => {
    assert.equal(util.isQueryParam(response.parameters), true);
    assert.equal(util.isQueryParam(response.url), false);
  });
});

describe('Utility function testing - Auth test returns 200 ok', () => {
  nock('https://onfleet.com/api/v2')
    .get('/auth/test')
    .reply(200, response.auth);
  it('authenticate endpoint', () => {
    return util.authenticate('some_api_key')
      .then((res) => {
        assert.equal((response.auth.status === 200), res);
      });
  });
});

describe('HTTP Request testing', () => {
  const onfleet = new Onfleet(apiKey);
  beforeEach(() => {
    // We use the admin endpoint to test list()
    nock(baseUrl)
      .get(uri => uri.includes('admins'))
      .reply(200, response.list);
    // We use the tasks and recipients endpoint to test getOne()
    nock(baseUrl)
      .get(uri => uri.includes('tasks'))
      .reply(200, response.get);
    nock(baseUrl)
      .get(uri => uri.includes('recipients'))
      .reply(200, response.getRecipients);
    // We use the team endpoint to test createOne()
    nock(baseUrl)
      .post(uri => uri.includes('teams'))
      .reply(200, response.createTeams);
    // We use the task endpoint to test forceComplete()
    nock(baseUrl)
      .post(uri => uri.includes('complete'))
      .reply(200, response.forceComplete);
    // We use the workers endpoint to test update()
    nock(baseUrl)
      .put(uri => uri.includes('workers'))
      .reply(200, response.updateWorkers);
    // We use the tasks endpoint to test deleteOne()
    nock(baseUrl)
      .delete(uri => uri.includes('tasks'))
      .reply(200, response.deleteTask);
  });
  it('Get function', () => {
    return onfleet.administrators.get()
      .then((res) => {
        // Expect an object gets returned
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
        // Expect an object gets returned
        expect(typeof res).to.equal('object');
        // Test results of ID and Notes
        assert.equal(res.id, 'SxD9Ran6pOfnUDgfTecTsgXd');
        assert.equal(res.notes, 'Onfleet API Wrappers!');
      });
  });
  it('Get function - by ShortId', () => {
    return onfleet.tasks.get('44a56188', 'shortId')
      .then((res) => {
        // Expect an object gets returned
        expect(typeof res).to.equal('object');
        // Test results of shortId and trackingURL
        assert.equal(res.shortId, '44a56188');
        assert.equal(res.trackingURL, 'https://onf.lt/44a56188');
      });
  });
  it('Get function - by phone number', () => {
    return onfleet.recipients.get('+18881787788', 'phone')
      .then((res) => {
        // Expect an object gets returned
        expect(typeof res).to.equal('object');
        // Test results of phone and recipient SMS setting
        assert.equal(res.phone, '+18881787788');
        assert.equal(res.skipSMSNotifications, false);
      });
  });
  it('Get function - by name', () => {
    return onfleet.recipients.get('Onfleet Rocks', 'name')
      .then((res) => {
        // Expect an object gets returned
        expect(typeof res).to.equal('object');
        assert.equal(res.name, 'Onfleet Rocks');
      });
  });
  it('Create function', () => {
    return onfleet.teams.create(newTeam)
      .then((res) => {
        // Expect an object gets returned
        expect(typeof res).to.equal('object');
        assert.equal(res.name, 'Onfleet Team');
      });
  });
  it('Force complete a task', () => {
    return onfleet.tasks.forceComplete('6Fe3qqFZ0DDwsM86zBlHJtlJ', completionDetail)
      .then((res) => {
        // Expect an object gets returned
        expect(typeof res).to.equal('object');
        assert.equal(res.status, 200);
        assert.equal(res.completionDetails.notes, 'Forced complete by Onfleet Wrapper');
      });
  });
  it('Update a worker', () => {
    return onfleet.workers.update('Mdfs*NDZ1*lMU0abFXAT82lM', updateDetail)
      .then((res) => {
        // Expect an object gets returned
        expect(typeof res).to.equal('object');
        assert.equal(res.name, 'Stephen Curry');
        assert.equal(res.phone, '+18883033030');
      });
  });
  it('Delete a task', () => {
    return onfleet.tasks.deleteOne('AqzN6ZAq*qlSDJ0FzmZIMZz~')
      .then((res) => {
        // Expect a status code being thrown
        expect(typeof res).to.equal('number');
        assert.equal(res, 200);
      });
  });
});
