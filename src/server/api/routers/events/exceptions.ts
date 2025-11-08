import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from "@/server/api/exceptions";

/**
 * Exception thrown when Meta API token is invalid
 */
export class InvalidMetaTokenException extends UnauthorizedException {
  constructor() {
    super("Meta API token is invalid or expired");
  }
}

/**
 * Exception thrown when pagination cursor is invalid
 */
export class InvalidCursorException extends BadRequestException {
  constructor() {
    super("Invalid pagination cursor provided");
  }
}

/**
 * Exception thrown when Meta Graph API request fails
 */
export class MetaApiException extends InternalServerErrorException {
  constructor(message = "Meta Graph API request failed") {
    super(message);
  }
}
