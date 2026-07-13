// Define a function to create custom errors
const createError = (name, message, status = null, cause = null, request = null) => {
  const error = new Error(message);
  error.name = name;
  error.status = status;
  error.cause = cause;
  error.request = request;
  return error;
};

// Create specific error types using the factory function.
// These must be `function` declarations, not arrow functions: they are
// invoked with `new` (see Methods.js and onfleet.js), and arrow functions
// have no [[Construct]] behavior, so `new` on one throws
// "X is not a constructor".
function ValidationError(message) {
  return createError('ValidationError', message);
}

function PermissionError(message, status, cause, request) {
  return createError('PermissionError', message, status, cause, request);
}

function HttpError(message, status, cause, request) {
  return createError('HttpError', message, status, cause, request);
}

function RateLimitError(message, status, cause, request) {
  return createError('RateLimitError', message, status, cause, request);
}

function ServiceError(message, status, cause, request) {
  return createError('ServiceError', message, status, cause, request);
}

// Export the custom error creators
export {
  ValidationError,
  PermissionError,
  HttpError,
  RateLimitError,
  ServiceError,
};
