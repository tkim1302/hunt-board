"use client";

import { formatDistanceToNow } from "date-fns";
import useLastUpdatedTimeStore from "../store/lastUpdatedTimeStore";

const LastUpdated: React.FC = () => {
  const { lastUpdated } = useLastUpdatedTimeStore();

  return (
    <p>
      {lastUpdated
        ? `last updated: ${formatDistanceToNow(lastUpdated)} ago`
        : ""}
    </p>
  );
};

export default LastUpdated;
