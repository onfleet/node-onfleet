// Define a function to create custom errors
const createError = (name, message, status = null, cause = null, request = null) => {
  const error = new Error(message);
  error.name = name;
  error.status = status;
  error.cause = cause;
  error.request = request;
  return error;
};

// Create specific error types using the factory function
const ValidationError = (message) => createError('ValidationError', message);

const PermissionError = (message, status, cause, request) => 
  createError('PermissionError', message, status, cause, request);

const HttpError = (message, status, cause, request) => 
  createError('HttpError', message, status, cause, request);

const RateLimitError = (message, status, cause, request) => 
  createError('RateLimitError', message, status, cause, request);

const ServiceError = (message, status, cause, request) => 
  createError('ServiceError', message, status, cause, request);

// Export the custom error creators
export {
  ValidationError,
  PermissionError,
  HttpError,
  RateLimitError,
  ServiceError,
};
