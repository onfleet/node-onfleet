/**
 * @desc Utility functions for the API Wrapper
 */

import fetch from 'node-fetch'; // Ensure this is installed: `npm install node-fetch`
import { Buffer } from 'buffer'; // Built-in node.js Buffer
// Replace `querystring` with URLSearchParams which is natively supported in modern Node.js

export const encode = (apiKey) => {
  // Encoder for API key
  const buff = Buffer.from(apiKey);
  const base64data = buff.toString('base64');
  return base64data;
};

export const authenticate = async (api) => {
  // Authentication checker, returns a boolean
  const url = `${api.baseUrl}/auth/test`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: api.headers,
    });
    return res.ok;
  } catch (error) {
    return false;
  }
};

export const isBase64Encoded = (str) => {
  const result = str.length === 24 && /^[a-zA-Z\d*~]{24}/.test(str);
  return result;
};

export const replaceWithId = (url, id) => {
  const path = url.replace(/:[a-z]*Id/, id);
  return path;
};

export const replaceWithEndpointAndParam = (url, endpoint, id) => {
  let path = url;
  if (['workers', 'teams', 'organizations'].includes(endpoint)) {
    path = url.replace(/\/:param/, '');
  }
  path = path.replace(/:[a-z]*Id$/, `${endpoint}/${id}`);
  return path;
};

export const appendQueryParameters = (url, queryObj) => {
  const params = new URLSearchParams(queryObj);
  const path = `${url}?${params.toString()}`;
  return path;
};

export const isQueryParam = (obj) => {
  return typeof obj === 'object';
};
