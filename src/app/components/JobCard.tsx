import { Job } from "@/app/types/types";
import useActiveCardStore from "../store/activeCardStore";

interface JobProp {
  job: Job;
  index: number;
  sectionTitle: string;
}

const JobCard: React.FC<JobProp> = ({ job, index, sectionTitle }) => {
  const { setActiveCard, setSourceSection } = useActiveCardStore();

  return (
    <div
      draggable
      onDragStart={() => {
        setSourceSection(sectionTitle);
        setActiveCard(index);
      }}
      onDragEnd={() => setActiveCard(null)}
      className="group mb-4 h-20 w-48 cursor-grab rounded-xl border border-gray-500 pb-3 pl-2 pr-2 pt-3 shadow-md transition-transform duration-200 ease-in-out hover:-translate-y-2"
    >
      <div className="border-l-4 border-gray-300 pl-3 group-hover:border-blue-500">
        <h2 className="text-xl">{job.jobTitle}</h2>
        <h3 className="text-md text-gray-600">{job.company}</h3>
      </div>
    </div>
  );
};

export default JobCard;
