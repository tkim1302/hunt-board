import React from "react";
import AddCardButton from "./AddCardButton";
import JobCard from "./JobCard";
import DropArea from "./DropArea";
import { Job } from "@/app/types/types";
import useActiveCardStore from "../store/activeCardStore";

interface SectionProp {
  sectionId: string;
  sectionTitle: string;
  jobs: Job[] | [];
  refreshJobs: () => void;
}

const Section: React.FC<SectionProp> = ({
  sectionId,
  sectionTitle,
  jobs,
  refreshJobs,
}) => {
  const { activeCard, sourceSection } = useActiveCardStore();

  const onDrop = async (
    destinationSection: string,
    destinationIndex: number,
  ) => {
    const sourceIndex = activeCard;

    try {
      const response = await fetch("/api/job/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceSection,
          destinationSection,
          sourceIndex,
          destinationIndex,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job position");
      }

      refreshJobs();
    } catch {
      alert("Error fetching data. Please try again later");
    }
  };

  return (
    <div className="flex h-screen w-80 min-w-80 flex-col border-r border-black">
      <div className="flex basis-[20%] flex-col items-center gap-16 border-b border-black pt-10">
        <h1 className="text-xl">{sectionTitle}</h1>
        <AddCardButton sectionId={sectionId} />
      </div>
      <div className="flex basis-[80%] flex-col items-center gap-6">
        <DropArea onDrop={() => onDrop(sectionId, 0)} />
        {jobs.map((job, index) => (
          <div key={job._id}>
            <JobCard
              job={job}
              index={index}
              sectionId={sectionId}
              refreshJobs={refreshJobs}
            />
            <DropArea onDrop={() => onDrop(sectionId, index + 1)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
