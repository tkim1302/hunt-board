"use client";

import { useState } from "react";

interface SectionTitleProps {
  sectionId: string;
  sectionTitle: string;
  refreshJobs: () => void;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  sectionId,
  sectionTitle,
  refreshJobs,
}) => {
  const [newTitle, setNewTitle] = useState(sectionTitle || "");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/section/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionId,
          newTitle: newTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update section title");
      }

      refreshJobs();
    } catch {
      alert("Error fetching data. Please try again later");
    }
  };

  return (
    <input
      onBlur={() => handleSubmit()}
      onChange={(e) => setNewTitle(e.target.value)}
      className="w-48 truncate text-center text-xl hover:bg-gray-100 focus:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500 dark:focus:bg-gray-500"
      value={newTitle}
    />
  );
};

export default SectionTitle;
