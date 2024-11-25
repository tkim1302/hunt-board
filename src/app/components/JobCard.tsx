import { Job } from "@/app/types/types";
import useActiveCardStore from "../store/activeCardStore";
import useModalStore from "../store/modalStore";
import useSectionStore from "../store/sectionStore";
import DeleteJobButton from "./DeleteJobButton";

interface JobProp {
  job: Job;
  index: number;
  sectionId: string;
  refreshJobs: () => void;
  disabled: boolean;
}

const JobCard: React.FC<JobProp> = ({
  job,
  index,
  sectionId,
  refreshJobs,
  disabled,
}) => {
  const { setActiveCard, setSourceSection } = useActiveCardStore();
  const { openModal, setEditTrue, setSelectedJob } = useModalStore();
  const { setSection } = useSectionStore();

  return (
    <div
      onClick={() => {
        if (!disabled) {
          openModal();
          setEditTrue();
          setSelectedJob(job);
          setSection(sectionId);
        }
      }}
      draggable={!disabled}
      onDragStart={() => {
        setSourceSection(sectionId);
        setActiveCard(index);
      }}
      onDragEnd={() => setActiveCard(null)}
      className={`${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-grab hover:-translate-y-2 hover:bg-blue-50"} group mb-4 flex h-20 w-60 rounded-xl border border-gray-500 bg-white pb-3 pl-2 pr-10 pt-3 shadow-md transition-transform duration-200 ease-in-out dark:border-none dark:bg-gray-500 dark:hover:bg-gray-600`}
    >
      <div className="overflow-hidden border-l-4 border-blue-100 pl-3 group-hover:border-blue-500">
        <h2 className="truncate text-xl dark:text-blue-300">{job.jobTitle}</h2>
        <h3 className="text-md truncate text-gray-500 dark:text-gray-200">
          {job.company}
        </h3>
      </div>
      <div className="absolute right-3 top-3 hidden opacity-50 group-hover:block dark:opacity-100">
        <DeleteJobButton
          jobId={job._id}
          sectionId={sectionId}
          refreshJobs={refreshJobs}
        />
      </div>
    </div>
  );
};

export default JobCard;
