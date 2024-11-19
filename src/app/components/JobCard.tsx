import { Job } from "@/app/types/types";

interface JobProp {
  job: Job;
}

const JobCard: React.FC<JobProp> = ({ job }) => {
  return (
    <div className="group w-48 cursor-pointer rounded-xl border border-gray-500 pb-3 pl-2 pr-2 pt-3 shadow-md transition-transform duration-200 ease-in-out hover:-translate-y-2">
      <div className="border-l-4 border-gray-300 pl-3 group-hover:border-blue-500">
        <h2 className="text-xl">{job.jobTitle}</h2>
        <h3 className="text-md text-gray-600">{job.company}</h3>
      </div>
    </div>
  );
};

export default JobCard;
