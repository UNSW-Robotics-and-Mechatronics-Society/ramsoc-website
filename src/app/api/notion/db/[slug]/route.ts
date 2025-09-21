import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug: databaseId } = await params;
  if (!databaseId) {
    return new NextResponse("Missing Notion database ID", { status: 400 });
  }
  const notionToken = process.env.NOTION_TOKEN;
  if (!notionToken) {
    return new NextResponse("Missing Notion token", { status: 500 });
  }

  const notion = new Client({
    auth: notionToken,
  });

  const db_result = await notion.databases.query({
    database_id: databaseId,
  });
  return NextResponse.json(db_result);
}
