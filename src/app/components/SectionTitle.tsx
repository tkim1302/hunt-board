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
      className="text-xl"
      value={newTitle}
    />
  );
};

export default SectionTitle;
