"use client";

import { useEffect, useState } from "react";
import AddCardButton from "./AddCardButton";
import JobCard from "./JobCard";
import { Job } from "@/app/types/types";

interface SectionProp {
  sectionTitle: string;
}

const Section: React.FC<SectionProp> = ({ sectionTitle }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`/api/section/${sectionTitle}`, {
          method: "GET",
          cache: "no-store",
        });

        const data = await res.json();
        setJobs(data);
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchJobs();
  }, [sectionTitle]);

  return (
    <div className="flex h-screen w-80 flex-col border-r border-black">
      <div className="flex basis-[20%] flex-col items-center gap-16 border-b border-black pt-10">
        <h1 className="text-xl">{sectionTitle}</h1>
        <AddCardButton sectionTitle={sectionTitle} />
      </div>
      <div className="flex basis-[80%] flex-col">
        {jobs.map((job) => (
          <JobCard key={job.jobTitle} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Section;
