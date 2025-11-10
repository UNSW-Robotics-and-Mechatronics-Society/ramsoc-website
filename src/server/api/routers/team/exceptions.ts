import {
  InternalServerErrorException,
  NotFoundException,
} from "../../exceptions";

/**
 * Exception thrown when team data is not found for a specific year
 */
export class TeamNotFoundException extends NotFoundException {
  constructor(year: number) {
    super(`Team data not found for year ${year}`);
  }
}

/**
 * Exception thrown when Contentful API request fails
 */
export class ContentfulApiException extends InternalServerErrorException {
  constructor(message: string) {
    super(message);
  }
}
