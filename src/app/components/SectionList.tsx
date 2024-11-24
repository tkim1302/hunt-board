"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import AddSection from "./AddSection";
import useLastUpdatedTimeStore from "../store/lastUpdatedTimeStore";
import Loading from "./Loading";
import useSectionStore from "../store/sectionStore";
import fetchSections from "../../../util/fetchSections";

const SectionList = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { sectionList, setSectionList } = useSectionStore();
  const { SetLastUpdated } = useLastUpdatedTimeStore();

  useEffect(() => {
    fetchSections(setSectionList, SetLastUpdated);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full overflow-x-auto">
      <div className="ml-10 flex gap-10">
        {sectionList.map(({ _id, title, jobs }) => (
          <Section
            key={_id}
            sectionId={_id}
            sectionTitle={title}
            jobs={jobs!}
            refreshJobs={() => fetchSections(setSectionList, SetLastUpdated)}
          />
        ))}
        <AddSection
          refreshJobs={() => fetchSections(setSectionList, SetLastUpdated)}
        />
      </div>
    </div>
  );
};

export default SectionList;
