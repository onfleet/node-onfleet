class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
  }
}

class PermissionError extends Error {
  constructor(message, status, cause, request) {
    super(message, status, cause, request);
    this.name = 'PermissionError';
    this.message = message;
    this.status = status;
    this.cause = cause;
    this.request = request;
  }
}

class HttpError extends Error {
  constructor(message, status, cause, request) {
    super(message, status, cause, request);
    this.name = 'HttpError';
    this.message = message;
    this.status = status;
    this.cause = cause;
    this.request = request;
  }
}

class RateLimitError extends Error {
  constructor(message, status, cause, request) {
    super(message, status, cause, request);
    this.name = 'RateLimitError';
    this.message = message;
    this.status = status;
    this.cause = cause;
    this.request = request;
  }
}

class ServiceError extends Error {
  constructor(message, status, cause, request) {
    super(message, status, cause, request);
    this.name = 'ServiceError';
    this.message = message;
    this.status = status;
    this.cause = cause;
    this.request = request;
  }
}

module.exports = {
  ValidationError,
  PermissionError,
  HttpError,
  RateLimitError,
  ServiceError,
};
