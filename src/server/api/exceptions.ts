import { TRPCError } from "@trpc/server";

/**
 * Base class for all API exceptions
 */
export class ApiException extends TRPCError {
  constructor(
    message: string,
    code: TRPCError["code"] = "INTERNAL_SERVER_ERROR",
  ) {
    super({ code, message });
    this.name = this.constructor.name;
  }
}

/**
 * BAD_REQUEST - Invalid client input
 */
export class BadRequestException extends ApiException {
  constructor(message = "Bad request") {
    super(message, "BAD_REQUEST");
  }
}

/**
 * UNAUTHORIZED - Authentication required or failed
 */
export class UnauthorizedException extends ApiException {
  constructor(message = "Unauthorized") {
    super(message, "UNAUTHORIZED");
  }
}

/**
 * FORBIDDEN - Authenticated but not allowed
 */
export class ForbiddenException extends ApiException {
  constructor(message = "Forbidden") {
    super(message, "FORBIDDEN");
  }
}

/**
 * NOT_FOUND - Resource not found
 */
export class NotFoundException extends ApiException {
  constructor(message = "Not found") {
    super(message, "NOT_FOUND");
  }
}

/**
 * TIMEOUT - Request timeout
 */
export class TimeoutException extends ApiException {
  constructor(message = "Request timeout") {
    super(message, "TIMEOUT");
  }
}

/**
 * CONFLICT - Resource conflict
 */
export class ConflictException extends ApiException {
  constructor(message = "Conflict") {
    super(message, "CONFLICT");
  }
}

/**
 * PRECONDITION_FAILED - Precondition check failed
 */
export class PreconditionFailedException extends ApiException {
  constructor(message = "Precondition failed") {
    super(message, "PRECONDITION_FAILED");
  }
}

/**
 * PAYLOAD_TOO_LARGE - Request payload too large
 */
export class PayloadTooLargeException extends ApiException {
  constructor(message = "Payload too large") {
    super(message, "PAYLOAD_TOO_LARGE");
  }
}

/**
 * METHOD_NOT_SUPPORTED - HTTP method not supported
 */
export class MethodNotSupportedException extends ApiException {
  constructor(message = "Method not supported") {
    super(message, "METHOD_NOT_SUPPORTED");
  }
}

/**
 * UNPROCESSABLE_CONTENT - Validation error
 */
export class UnprocessableContentException extends ApiException {
  constructor(message = "Unprocessable content") {
    super(message, "UNPROCESSABLE_CONTENT");
  }
}

/**
 * TOO_MANY_REQUESTS - Rate limit exceeded
 */
export class TooManyRequestsException extends ApiException {
  constructor(message = "Too many requests") {
    super(message, "TOO_MANY_REQUESTS");
  }
}

/**
 * CLIENT_CLOSED_REQUEST - Client closed request
 */
export class ClientClosedRequestException extends ApiException {
  constructor(message = "Client closed request") {
    super(message, "CLIENT_CLOSED_REQUEST");
  }
}

/**
 * INTERNAL_SERVER_ERROR - Internal server error
 */
export class InternalServerErrorException extends ApiException {
  constructor(message = "Internal server error") {
    super(message, "INTERNAL_SERVER_ERROR");
  }
}
