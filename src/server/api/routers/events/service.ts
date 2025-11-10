import axios from "axios";

import { env } from "@/env";
import type { MetaGraphAPIEventResponse } from "./types";

import {
  InvalidCursorException,
  InvalidMetaTokenException,
  MetaApiException,
} from "./exceptions";
import type { GetInfiniteEventsInput } from "./schemas";

/**
 * Fetches events from Meta Graph API with cursor-based pagination
 * @param input - Contains optional cursor for pagination
 * @returns Events data with pagination information
 * @throws InvalidMetaTokenException if Meta API token is invalid
 * @throws InvalidCursorException if pagination cursor is invalid
 * @throws MetaApiException if API request fails
 */
export async function getInfiniteEvents(input: GetInfiniteEventsInput) {
  try {
    const res = await axios.get<MetaGraphAPIEventResponse>(
      `https://graph.facebook.com/v21.0/me/events?access_token=${env.META_API_PAGE_ACCESS_TOKEN}&fields=cover%2Cdescription%2Cend_time%2Cstart_time%2Cplace%2Cname%2Cid&limit=25${input.cursor ? `&after=${input.cursor}` : ""}`,
    );

    const data = res.data;

    return {
      data: data.data,
      paging: { cursors: data.paging?.cursors },
      nextCursor: data.paging?.cursors?.after,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        throw new MetaApiException("Meta API request failed");
      }

      const wwwAuthenticate = err.response.headers["www-authenticate"] as
        | string
        | undefined;

      if (wwwAuthenticate?.includes("invalid_token")) {
        throw new InvalidMetaTokenException();
      }

      if (wwwAuthenticate?.includes("cursor")) {
        throw new InvalidCursorException();
      }

      throw new MetaApiException(err.message);
    }

    throw new MetaApiException("Failed to fetch events");
  }
}
