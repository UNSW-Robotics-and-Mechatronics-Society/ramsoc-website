"use client";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { useMemo, useState } from "react";
import { NotionRenderer } from "react-notion-x";

import { Container } from "@/components/ui/Container";

import { CareerCard } from "./_components/CareerCard";
import HeroSection from "./_components/HeroSection";
import { PostLoading } from "./_components/PostLoading";

interface CareerMetaData {
  id: string;
  logo: string;
  company: string;
  deadline: string;
  email: string;
  position: string;
  ctaUrl: string;
}

export default function CareersPage() {
  const [activeId, setActiveId] = useState<string>();

  const JOB_LISTING_DB_ID = process.env.NEXT_PUBLIC_JOB_LISTING_DB_ID;

  if (!JOB_LISTING_DB_ID) console.error("No JOB_LISTING_DB_ID set");

  const queryDB = useQuery({
    queryKey: ["notion", "db", JOB_LISTING_DB_ID],
    queryFn: async () => {
      return await axios
        .get(`/api/notion/db/${JOB_LISTING_DB_ID}`, {})
        .then((res) => res.data);
    },
    staleTime: 60 * 60 * 1000,
  });

  const queryPage = useQuery({
    queryKey: ["notion", "page", activeId],
    queryFn: async () => {
      if (!activeId) throw new Error("No activeId set");
      const res = await axios.get<ExtendedRecordMap>(
        `/api/notion/page/${activeId}`,
      );
      return res.data;
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!activeId, // only fetch if activeId is set
  });

  const pageMetaData = useMemo(() => {
    const pagesMeta: { [key: string]: CareerMetaData } = {};
    if (!queryDB.data) {
      return;
    }
    const pages = queryDB.data.results;

    for (const page of pages) {
      const pageMeta: CareerMetaData = {
        id: page.id,
        logo: page.properties["Logo"].files.at(0)?.file.url,
        company: page.properties.Company.title.at(0)?.plain_text,
        deadline: page.properties["Application Deadline"].date?.start,
        email: page.properties["Contact Email"].email,
        position: page.properties.Position.rich_text.at(0)?.plain_text,
        ctaUrl: page.properties.Link.url,
      };
      pagesMeta[pageMeta.id] = pageMeta;
    }
    return pagesMeta;
  }, [queryDB.data]);

  return (
    <main className="mb-16 grid min-h-screen">
      <HeroSection></HeroSection>
      <Container className="grid grid-cols-12 gap-8 px-4">
        <aside className="col-span-4">
          <ul className="flex flex-col gap-4">
            {pageMetaData &&
              Object.entries(pageMetaData).map(([id, meta]: any) => {
                return (
                  <CareerCard
                    key={id}
                    id={id}
                    logoUrl={meta.logo}
                    ctaUrl={meta.ctaUrl}
                    company={meta.company}
                    deadline={meta.deadline}
                    email={meta.email}
                    isActive={activeId === id}
                    position={meta.position}
                    onClick={() => {
                      setActiveId(id);
                    }}
                  />
                );
              })}
          </ul>
        </aside>
        <section className="col-span-8 rounded-md border border-gray-200 p-8">
          {pageMetaData && (
            <h2 className="mb-4">
              {pageMetaData[activeId ?? ""]?.position ?? ""}
            </h2>
          )}
          {queryPage.data ? (
            <NotionRenderer
              recordMap={queryPage.data}
              // Commiting war crime to override default padding and margin
              className="!m-0 !p-0"
              components={{
                nextImage: Image,
                nextLink: Link,
              }}
            />
          ) : (
            <PostLoading />
          )}
        </section>
      </Container>
    </main>
  );
}
