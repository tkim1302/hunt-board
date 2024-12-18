import React from "react";
import AddCardButton from "./AddCardButton";
import JobCard from "./JobCard";
import DropArea from "./DropArea";
import { Job } from "@/app/types/types";
import useActiveCardStore from "../store/activeCardStore";
import SectionTitle from "./SectionTitle";
import DeleteSectionButton from "./DeleteSectionButton";
import useLoadingStore from "../store/loadingStore";

interface SectionProp {
  sectionId: string;
  sectionTitle: string;
  jobs: Job[] | [];
  refreshJobs: () => Promise<void>;
}

const Section: React.FC<SectionProp> = ({
  sectionId,
  sectionTitle,
  jobs,
  refreshJobs,
}) => {
  const { activeCard, sourceSection } = useActiveCardStore();
  const { setIsLoading } = useLoadingStore();

  const onDrop = async (
    destinationSection: string,
    destinationIndex: number,
  ) => {
    const sourceIndex = activeCard;

    try {
      setIsLoading(true);
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

      await refreshJobs();
    } catch {
      alert("Error fetching data. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[85vh] w-80 min-w-80 flex-col rounded-xl border border-gray-500 shadow-md dark:border-none dark:bg-gray-700">
      <div className="flex h-48 min-h-48 flex-col items-center gap-14 pt-10">
        <div className="relative flex w-64 items-center justify-center">
          <SectionTitle
            sectionId={sectionId}
            sectionTitle={sectionTitle}
            refreshJobs={refreshJobs}
          />
          <div className="absolute right-0">
            <DeleteSectionButton
              sectionId={sectionId}
              refreshJobs={async () => await refreshJobs()}
            />
          </div>
        </div>

        <AddCardButton sectionId={sectionId} />
      </div>
      <div className="flex flex-col items-center overflow-y-auto">
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
