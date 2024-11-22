"use client";
import { useEffect, useState } from "react";
import { Section as SectionType } from "@/app/types/types";
import Section from "./Section";
import AddSection from "./AddSection";
import useLastUpdatedTimeStore from "../store/lastUpdatedTimeStore";

const SectionList = () => {
  const [sections, setSections] = useState<SectionType[]>([]);
  const { SetLastUpdated } = useLastUpdatedTimeStore();

  const fetchSections = async () => {
    try {
      const response = await fetch("/api/section/get");
      if (!response.ok) {
        throw new Error("Failed to fetch sections data");
      }
      const result = await response.json();
      setSections(result.sections);
      SetLastUpdated(result.lastUpdated);
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
        {sections.map(({ _id, title, jobs }) => (
          <Section
            key={_id}
            sectionId={_id}
            sectionTitle={title}
            jobs={jobs!}
            refreshJobs={() => fetchSections()}
          />
        ))}
        <AddSection refreshJobs={fetchSections} />
      </div>
    </div>
  );
};

export default SectionList;
