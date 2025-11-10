import { env } from "@/env";
import { createClient } from "contentful";

export const client = createClient({
  space: `${env.CONTENTFUL_SPACE_ID}`,
  accessToken: `${env.CONTENTFUL_ACCESS_TOKEN}`,
});
