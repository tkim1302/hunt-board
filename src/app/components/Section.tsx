interface SectionProp {
  sectionName: string;
}

const Section: React.FC<SectionProp> = ({ sectionName }) => {
  return (
    <div className="flex h-screen w-80 flex-col border-r border-black">
      <div className="flex basis-[20%] flex-col items-center gap-12 border-b border-black pt-10">
        <h1>{sectionName}</h1>
        <div>+</div>
      </div>
      <div className="flex basis-[80%] flex-col"></div>
    </div>
  );
};

export default Section;
