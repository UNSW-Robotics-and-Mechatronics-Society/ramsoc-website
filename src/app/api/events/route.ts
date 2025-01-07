import axios from "axios";
import { type NextRequest } from "next/server";

import { MetaGraphAPIEventResponse } from "@/types/events";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const cursor = searchParams.get("cursor");
  try {
    const res = await axios.get<MetaGraphAPIEventResponse>(
      `https://graph.facebook.com/v21.0/me/events?access_token=${process.env.META_API_PAGE_ACCESS_TOKEN}&fields=cover%2Cdescription%2Cend_time%2Cstart_time%2Cplace%2Cname%2Cid&limit=25${cursor ? `&after=${cursor}` : ""}`,
    );
    const data = res.data;
    return Response.json({
      data: data.data,
      paging: { cursors: data.paging?.cursors },
    });
  } catch (err: any) {
    if (err.response.headers.get("www-authenticate").includes(`cursor`)) {
      return new Response("Invalid Cursor", { status: 400 });
    } else if (
      err.response.headers.get("www-authenticate").includes("invalid_token")
    ) {
      return new Response("Internal Server Error", { status: 503 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}

export const runtime = "edge";
