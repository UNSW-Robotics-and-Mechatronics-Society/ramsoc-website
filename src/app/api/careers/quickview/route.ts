import { CareerMetaData } from "@/types/careers";

import { GET as notionDbGet } from "../../notion/db/[slug]/route";

function transform(data: any) {
  const pages = data.results;

  const pagesMeta: { [key: string]: CareerMetaData } = {};
  for (const page of pages) {
    const properties = page.properties;
    const pageMeta: CareerMetaData = {
      id: page.id,
      logo: properties["Logo"].files.at(0)?.file.url,
      company: properties.Company.title.at(0)?.plain_text,
      deadline: properties["Application Deadline"].date?.start,
      hasDetails: properties["Details Available"].checkbox,
      email: properties["Contact Email"].email,
      position: properties.Position.rich_text.at(0)?.plain_text,
      ctaUrl: properties.Link.url,
      location: properties.Location.rich_text.at(0)?.plain_text,
      pay: properties.Pay.rich_text.at(0)?.plain_text,
      description: properties.Description.rich_text.at(0)?.plain_text,
      type: properties.Type.select.name,
      tags: properties.Tags.multi_select.map(
        (tag: { name: string }) => tag.name,
      ),
    };

    if (properties.Visibility.select.name === "Hidden") {
      continue;
    }

    if (
      pageMeta.deadline &&
      Date.now() > new Date(pageMeta.deadline).getTime()
    ) {
      continue;
    }

    pagesMeta[pageMeta.id] = pageMeta;
  }
  return pagesMeta;
}

export async function GET(request: Request) {
  const resp = await notionDbGet(request, {
    params: new Promise(() => ({
      slug: process.env.NOTION_API_CAREERS_DB_KEY ?? "",
    })),
  });

  const rawData = await resp.json();

  return Response.json(transform(rawData));
}

export const runtime = "edge";
