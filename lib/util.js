/**
 * @desc Utility functions for the API Wrapper
 */

const fetch = require('node-fetch');
const querystring = require('querystring');

exports.encode = (apiKey) => {
// Encoder for API key
  const buff = Buffer.from(apiKey);
  const base64data = buff.toString('base64');
  return base64data;
};

exports.authenticate = (apiKey) => {
// Authentication checker, returns a boolean
  const url = 'https://onfleet.com/api/v2/auth/test';
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${this.encode(apiKey)}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return true;
      }
      return false;
    }).catch(() => false);
};

exports.isBase64Encoded = (str) => {
  const result = (str.length === 24 && (/^[a-zA-Z\d*~]{24}/).test(str));
  return result;
};

exports.replaceWithId = (url, id) => {
  const path = url.replace(/:[a-z]*Id/, id);
  return path;
};

exports.replaceWithEndpointAndParam = (url, endpoint, id) => {
  let path = url;
  if (['workers', 'teams', 'organizations'].includes(endpoint)) {
    path = url.replace(/\/:param/, '');
  }
  path = path.replace(/:[a-z]*Id$/, `${endpoint}/${id}`);
  return path;
};

exports.appendQueryParameters = (url, queryObj) => {
  const path = `${url}?${querystring.stringify(queryObj)}`;
  return path;
};

exports.isQueryParam = (obj) => {
  if (typeof obj === 'object') {
    return true;
  } return false;
};
