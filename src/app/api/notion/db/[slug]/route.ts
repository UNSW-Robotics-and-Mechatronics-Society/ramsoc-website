import { Client } from "@notionhq/client";

export async function GET(request: Request) {
  const dbKey = "redacted";
  const notion = new Client({
    auth: "redacted",
  });
  return Response.json(await notion.databases.query({ database_id: dbKey }));
}
