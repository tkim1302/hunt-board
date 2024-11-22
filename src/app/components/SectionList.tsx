"use client";
import { useEffect, useState } from "react";
import { Section as SectionType } from "@/app/types/types";
import Section from "./Section";

const SectionList = () => {
  const [sections, setSections] = useState<SectionType[]>([]);
  const fetchSections = async () => {
    try {
      const response = await fetch("/api/section/get");
      if (!response.ok) {
        throw new Error("Failed to fetch sections data");
      }
      const result = await response.json();
      setSections(result.sections);
    } catch {
      alert("Error fetching data. Please try again later");
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex">
        {sections.map(({ title, jobs }) => (
          <Section
            key={title}
            sectionTitle={title}
            jobs={jobs!}
            refreshJobs={() => fetchSections()}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionList;
