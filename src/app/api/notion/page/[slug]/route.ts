import { Client } from "@notionhq/client";
import { NotionCompatAPI } from "@/lib/notion-compat/src";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const notion = new NotionCompatAPI(
    new Client({
      auth: "redacted",
    }),
  );

  const pageId = params.slug;

  if (!pageId) {
    return new Response("Missing Notion page ID", { status: 400 });
  }

  const recordMap = await notion.getPage(pageId);

  return Response.json(recordMap);
}
