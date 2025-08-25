import { Client } from "@notionhq/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const dbKey = (await params).slug;
  const notion = new Client({
    auth: process.env.NOTION_API_READONLY_KEY,
  });
  return Response.json(await notion.databases.query({ database_id: dbKey }));
}

export const runtime = "edge";
