import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const cursor = searchParams.get("cursor");
  const res = await fetch(
    `https://graph.facebook.com/v21.0/me/events?access_token=${process.env.META_API_PAGE_ACCESS_TOKEN}&fields=cover%2Cdescription%2Cend_time%2Cstart_time%2Cplace%2Cname%2Cid&limit=25${cursor ? `&after=${cursor}` : ""}`,
    { next: { revalidate: 3600 }, cache: "force-cache" },
  );
  const data = await res.json();
  return Response.json({
    data: data.data,
    paging: { cursors: data.paging?.cursors },
  });
}

export const runtime = "edge";
