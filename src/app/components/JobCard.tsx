import { Job } from "@/app/types/types";

interface JobProp {
  job: Job;
}

const JobCard: React.FC<JobProp> = ({ job }) => {
  return <div>{job.jobTitle}</div>;
};

export default JobCard;
