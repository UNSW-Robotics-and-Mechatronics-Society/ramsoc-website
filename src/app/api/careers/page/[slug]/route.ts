import { GET as notionPageGet } from "@/app/api/notion/page/[slug]/route";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  return notionPageGet(request, { params });
}

export const runtime = "edge";
