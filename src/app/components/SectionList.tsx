"use client";

import { useEffect, useState } from "react";
import { Collection, Section as SectionType } from "@/app/types/types";
import Section from "./Section";

interface SectionListProp {
  result: Collection;
}

const SectionList: React.FC<SectionListProp> = ({ result }) => {
  const [sectionsWithJobs, setSectionsWithJobs] = useState<SectionType[]>([]);

  const fetchJobs = async () => {
    try {
      const fetchedSections: SectionType[] = [];

      for (const section of result.sections) {
        const response = await fetch(`/api/section/${section.title}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to update job position");
        }

        const jobs = await response.json();
        fetchedSections.push({ title: section.title, jobs });
      }
      setSectionsWithJobs(fetchedSections);
    } catch {
      alert("Error fetching data. Please try again later");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [result]);

  return (
    <div className="flex">
      {sectionsWithJobs.map(({ title, jobs }) => (
        <Section
          key={title}
          sectionTitle={title}
          jobs={jobs!}
          refreshJobs={fetchJobs}
        />
      ))}
    </div>
  );
};

export default SectionList;
