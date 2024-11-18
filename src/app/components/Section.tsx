import AddCardButton from "./AddCardButton";
import JobCard from "./JobCard";

interface SectionProp {
  sectionName: string;
}

const Section: React.FC<SectionProp> = ({ sectionName }) => {
  return (
    <div className="flex h-screen w-80 flex-col border-r border-black">
      <div className="flex basis-[20%] flex-col items-center gap-16 border-b border-black pt-10">
        <h1 className="text-xl">{sectionName}</h1>
        <AddCardButton />
      </div>
      <div className="flex basis-[80%] flex-col">
        <JobCard />
      </div>
    </div>
  );
};

export default Section;
