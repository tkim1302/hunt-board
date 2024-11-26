"use client";

import { useState } from "react";
import useLoadingStore from "../store/loadingStore";
import Loading from "./Loading";

interface AddSectionProps {
  refreshJobs: () => void;
}

const AddSection: React.FC<AddSectionProps> = ({ refreshJobs }) => {
  const [isMouseOn, setIsMouseOn] = useState(false);
  const { isLoading } = useLoadingStore();

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
      className={`flex h-[85vh] w-80 min-w-80 cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-500 shadow-md ${isMouseOn ? "bg-gray-100" : "bg-white"} dark:border-none dark:bg-gray-700 dark:hover:bg-slate-600`}
    >
      <div className="flex flex-col items-center text-2xl dark:text-gray-200">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <h2>Add Section</h2>
            <h2>+</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSection;
