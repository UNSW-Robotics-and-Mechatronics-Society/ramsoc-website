"use client";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { useState } from "react";
import { NotionRenderer } from "react-notion-x";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CareerMetaData } from "@/types/careers";

import { CareerCard } from "./_components/CareerCard";
import { CareerCardLoading } from "./_components/CareerCardLoading";
import HeroSection from "./_components/HeroSection";
import { PostLoading } from "./_components/PostLoading";

export default function CareersPage() {
  const [activeId, setActiveId] = useState<string>();

  const queryMetadata = useQuery<Record<string, CareerMetaData>>({
    queryKey: ["notion", "db", "careers"],
    queryFn: async () => {
      return await axios.get(`/api/careers/quickview`).then((res) => res.data);
    },
    staleTime: 60 * 60 * 1000,
  });

  const queryPage = useQuery({
    queryKey: ["notion", "page", activeId],
    queryFn: async () => {
      if (!activeId) throw new Error("No activeId set");
      const res = await axios.get<ExtendedRecordMap>(
        `/api/careers/page/${activeId}`,
      );
      return res.data;
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!activeId, // only fetch if activeId is set
  });

  return (
    <main className="mb-16 min-h-screen">
      <HeroSection></HeroSection>
      <Container className="px-4">
        {!activeId &&
          (queryMetadata.data ? (
            <>
              <div className="mb-8 text-xl font-bold">
                {queryMetadata.data && (
                  <>{Object.keys(queryMetadata.data).length} Jobs Found</>
                )}
              </div>

              <div className="flex flex-col gap-8">
                {queryMetadata.data &&
                  Object.keys(queryMetadata.data).length &&
                  Object.entries(queryMetadata.data).map(([id, meta]) => {
                    return (
                      <CareerCard
                        key={id}
                        onClick={() => {
                          setActiveId(id);
                        }}
                        {...meta}
                      ></CareerCard>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 text-xl font-bold">Loading...</div>
              <div className="flex flex-col gap-8">
                <CareerCardLoading></CareerCardLoading>
                <CareerCardLoading></CareerCardLoading>
                <CareerCardLoading></CareerCardLoading>
              </div>
            </>
          ))}

        {activeId && (
          <section className="col-span-8 rounded-md border border-gray-200 p-4">
            {queryMetadata.data && (
              <div className="flex flex-col justify-between gap-8 sm:flex-row">
                <h2 className="mb-4">
                  {queryMetadata.data[activeId ?? ""]?.position ?? ""}
                </h2>
                <Button
                  className="h-fit"
                  variant="outline"
                  onClick={() => setActiveId(undefined)}
                >
                  Back
                </Button>
              </div>
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
              ></NotionRenderer>
            ) : (
              <PostLoading />
            )}
          </section>
        )}
      </Container>
    </main>
  );
}
