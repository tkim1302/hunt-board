"use client";

import { useEffect } from "react";
import Section from "./Section";
import AddSection from "./AddSection";
import useLastUpdatedTimeStore from "../store/lastUpdatedTimeStore";
import useSectionStore from "../store/sectionStore";
import fetchSections from "../../../util/fetchSections";
import useLoadingStore from "../store/loadingStore";

const SectionList = () => {
  const { setIsLoading } = useLoadingStore();

  const { sectionList, setSectionList } = useSectionStore();
  const { SetLastUpdated } = useLastUpdatedTimeStore();

  useEffect(() => {
    fetchSections(setSectionList, SetLastUpdated);
    setIsLoading(false);
  }, [setSectionList, SetLastUpdated, setIsLoading]);

  return (
    <div className="h-full overflow-x-auto">
      <div className="ml-10 flex gap-10">
        {sectionList.map(({ _id, title, jobs }) => (
          <Section
            key={_id}
            sectionId={_id}
            sectionTitle={title}
            jobs={jobs!}
            refreshJobs={async () => {
              await fetchSections(setSectionList, SetLastUpdated);
            }}
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
