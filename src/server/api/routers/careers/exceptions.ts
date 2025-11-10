import {
  InternalServerErrorException,
  NotFoundException,
} from "../../exceptions";

/**
 * Exception thrown when Notion careers database is not configured
 */
export class CareersNotConfiguredException extends InternalServerErrorException {
  constructor() {
    super("Notion careers database ID not configured");
  }
}

/**
 * Exception thrown when Notion API request fails
 */
export class NotionApiException extends InternalServerErrorException {
  constructor(message: string) {
    super(message);
  }
}

/**
 * Exception thrown when careers data is not found
 */
export class CareersNotFoundException extends NotFoundException {
  constructor() {
    super("No careers data found");
  }
}

/**
 * Exception thrown when a specific career page is not found
 */
export class CareerNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Career page not found: ${id}`);
  }
}
