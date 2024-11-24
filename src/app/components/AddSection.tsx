"use client";

import { useState } from "react";

interface AddSectionProps {
  refreshJobs: () => void;
}

const AddSection: React.FC<AddSectionProps> = ({ refreshJobs }) => {
  const [isMouseOn, setIsMouseOn] = useState(false);

  const handleClick = async () => {
    try {
      const response = await fetch("/api/section/new", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      refreshJobs();
    } catch {
      alert("Error adding section");
    }
  };

  return (
    <div
      onClick={() => handleClick()}
      onMouseOver={() => setIsMouseOn(true)}
      onMouseOut={() => setIsMouseOn(false)}
      className={`flex h-[85vh] w-80 min-w-80 cursor-pointer flex-col items-center justify-center rounded-xl border border-black ${isMouseOn ? "bg-gray-100" : "bg-white"}`}
    >
      <div className="flex flex-col items-center text-2xl">
        <h2>Add Section</h2>
        <h2>+</h2>
      </div>
    </div>
  );
};

export default AddSection;
