import { Client } from "@notionhq/client";
import type { ExtendedRecordMap } from "notion-types";

import { env } from "@/env";
import { NotionCompatAPI } from "@/lib/notion-compat/src";

import {
  CareerNotFoundException,
  CareersNotConfiguredException,
  NotionApiException,
} from "./exceptions";
import type { CareerMetaDataSchema } from "./schemas";

/**
 * Maps Notion database results to CareerMetaData objects
 */
const mapCareerMetaDatas = (
  data: any,
): { [key: string]: CareerMetaDataSchema } => {
  const pages = data.results;
  const pagesMeta: { [key: string]: CareerMetaDataSchema } = {};

  for (const page of pages) {
    const properties = page.properties;

    // Skip hidden entries
    if (properties.Visibility?.select?.name === "Hidden") {
      continue;
    }

    const pageMeta: CareerMetaDataSchema = {
      id: page.id,
      logo:
        properties["Logo"]?.files?.at(0)?.file?.url ||
        "./careers/company-placeholder.svg",
      company: properties.Company?.title?.at(0)?.plain_text || null,
      deadline: properties["Application Deadline"]?.date?.start || null,
      hasDetails: properties["Details Available"]?.checkbox || false,
      email: properties["Contact Email"]?.email || null,
      position: properties.Position?.rich_text?.at(0)?.plain_text || null,
      ctaUrl: properties.Link?.url || null,
      location: properties.Location?.rich_text?.at(0)?.plain_text || null,
      pay: properties.Pay?.rich_text?.at(0)?.plain_text || null,
      description: properties.Description?.rich_text?.at(0)?.plain_text || null,
      type: properties.Type?.select?.name || "Unknown",
      tags:
        properties.Tags?.multi_select?.map(
          (tag: { name: string }) => tag.name,
        ) || [],
    };

    // Skip expired entries
    if (
      pageMeta.deadline &&
      Date.now() > new Date(pageMeta.deadline).getTime()
    ) {
      continue;
    }

    pagesMeta[pageMeta.id] = pageMeta;
  }

  return pagesMeta;
};

/**
 * Fetches careers data from Notion database
 * @throws {CareersNotConfiguredException} if Notion database ID is not configured
 * @throws {NotionApiException} if Notion API request fails
 */
export const getCareers = async (): Promise<{
  [key: string]: CareerMetaDataSchema;
}> => {
  const dbId = env.NEXT_PUBLIC_NOTION_CAREERS_DB_SOURCE_ID;
  if (!dbId) {
    throw new CareersNotConfiguredException();
  }

  const notionToken = env.NOTION_TOKEN;
  if (!notionToken) {
    throw new NotionApiException("Notion token not configured");
  }

  const notion = new Client({
    auth: notionToken,
  });

  try {
    const dbResult = await notion.dataSources.query({
      data_source_id: dbId,
    });

    return mapCareerMetaDatas(dbResult);
  } catch (error: unknown) {
    // Re-throw custom exceptions
    if (
      error instanceof CareersNotConfiguredException ||
      error instanceof NotionApiException
    ) {
      throw error;
    }

    // Wrap Notion errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new NotionApiException(
      `Failed to fetch careers from Notion: ${errorMessage}`,
    );
  }
};

/**
 * Fetches a specific career page from Notion
 * @throws {NotionApiException} if Notion token is not configured or API request fails
 * @throws {CareerNotFoundException} if the page is not found
 */
export const getCareerById = async (id: string): Promise<ExtendedRecordMap> => {
  const notionToken = env.NOTION_TOKEN;
  if (!notionToken) {
    throw new NotionApiException("Notion token not configured");
  }

  const notion = new NotionCompatAPI(
    new Client({
      auth: notionToken,
    }),
  );

  try {
    const recordMap = await notion.getPage(id);
    return recordMap;
  } catch (error: unknown) {
    // Re-throw custom exceptions
    if (
      error instanceof NotionApiException ||
      error instanceof CareerNotFoundException
    ) {
      throw error;
    }

    // Wrap Notion errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Check if it's a 404 error
    if (errorMessage.includes("not found") || errorMessage.includes("404")) {
      throw new CareerNotFoundException(id);
    }

    throw new NotionApiException(
      `Failed to fetch career page from Notion: ${errorMessage}`,
    );
  }
};
