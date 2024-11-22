"use client";

import useLastUpdatedTimeStore from "../store/lastUpdatedTimeStore";

const LastUpdated: React.FC = () => {
  const { lastUpdated } = useLastUpdatedTimeStore();

  return <div>{lastUpdated}</div>;
};

export default LastUpdated;
