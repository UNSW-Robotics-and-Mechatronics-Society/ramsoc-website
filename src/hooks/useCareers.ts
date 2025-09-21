import { useQuery } from "@tanstack/react-query";
import { CareerMetaData } from "@/types/careers";
import axios from "axios";

const mapCareerMetaDatas = (data: any): { [key: string]: CareerMetaData } => {
  const pages = data.results;
  const pagesMeta: { [key: string]: CareerMetaData } = {};

  for (const page of pages) {
    const properties = page.properties;

    // Skip hidden entries
    if (properties.Visibility.select.name === "Hidden") {
      continue;
    }

    const pageMeta: CareerMetaData = {
      id: page.id,
      logo: properties["Logo"]?.files?.at(0)?.file?.url || null,
      company: properties.Company?.title?.at(0)?.plain_text || null,
      deadline: properties["Application Deadline"]?.date?.start || null,
      hasDetails: properties["Details Available"]?.checkbox || false,
      email: properties["Contact Email"]?.email || null,
      position: properties.Position?.rich_text?.at(0)?.plain_text || null,
      ctaUrl: properties.Link?.url || null,
      location: properties.Location?.rich_text?.at(0)?.plain_text || null,
      pay: properties.Pay?.rich_text?.at(0)?.plain_text || null,
      description: properties.Description?.rich_text?.at(0)?.plain_text || null,
      type: properties.Type?.select?.name || "Unknown", // Handle null select
      tags:
        properties.Tags?.multi_select?.map(
          (tag: { name: string }) => tag.name,
        ) || [],
    };

    // Skip expired entries
    if (
      pageMeta.deadline &&
      Date.now() > new Date(pageMeta.deadline).getTime()
    ) {
      continue;
    }

    pagesMeta[pageMeta.id] = pageMeta;
  }

  return pagesMeta;
};

export const useCareerMetaDatas = () => {
  return useQuery({
    queryKey: ["careers"],
    queryFn: async (): Promise<{ [key: string]: CareerMetaData }> => {
      const dbId = process.env.NEXT_PUBLIC_NOTION_CAREERS_DB_ID;
      if (!dbId) {
        throw new Error("Notion careers database ID not configured");
      }

      const res = await axios.get(`/api/notion/db/${dbId}`);

      console.log("Notion careers DB response:", res.data);

      if (res.status !== 200) {
        throw new Error(`Failed to fetch careers: ${res.statusText}`);
      }

      return mapCareerMetaDatas(res.data);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
