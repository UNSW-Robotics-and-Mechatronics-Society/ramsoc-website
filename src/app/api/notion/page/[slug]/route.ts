import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

import { NotionCompatAPI } from "@/lib/notion-compat/src";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug: pageId } = await params;
  if (!pageId) {
    return new NextResponse("Missing Notion database ID", { status: 400 });
  }
  const notionToken = process.env.NOTION_TOKEN;
  if (!notionToken) {
    return new NextResponse("Missing Notion token", { status: 500 });
  }

  const notion = new NotionCompatAPI(
    new Client({
      auth: notionToken,
    }),
  );

  try {
    const recordMap = await notion.getPage(pageId);
    return NextResponse.json(recordMap);
  } catch (error) {
    console.error("Error querying Notion page:", error);
    return new NextResponse("Error querying Notion page", { status: 500 });
  }
}
