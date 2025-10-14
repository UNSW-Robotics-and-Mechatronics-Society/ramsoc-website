import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

import { NotionCompatAPI } from "@/lib/notion-compat/src";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const notionToken = process.env.NOTION_TOKEN;
  if (!notionToken) {
    return new NextResponse("Notion token not configured", { status: 500 });
  }

  const { slug: pageId } = await params;
  if (!pageId) {
    return new NextResponse("Missing Notion page ID", { status: 400 });
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
    console.error("Error fetching Notion page:", error);
    return new NextResponse("Notion page not found", { status: 404 });
  }
}
