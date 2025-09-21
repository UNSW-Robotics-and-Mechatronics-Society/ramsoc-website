import { Client, GetDatabaseResponse } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const notionToken = process.env.NOTION_TOKEN;
  if (!notionToken) {
    return new NextResponse("Notion token not configured", { status: 500 });
  }
  const { slug: databaseId } = await params;
  if (!databaseId) {
    return new NextResponse("Missing Notion database ID", { status: 400 });
  }
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  try {
    const dbResult = await notion.databases.query({
      database_id: databaseId,
    });
    return NextResponse.json(dbResult);
  } catch (error) {
    console.error("Error fetching Notion database:", error);
    return new NextResponse("Notion database not found", { status: 404 });
  }
}
