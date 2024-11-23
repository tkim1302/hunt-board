"use client";

import Image from "next/image";
import { useState } from "react";

interface DeleteJobButtonProps {
  jobId: string;
  sectionId: string;
  refreshJobs: () => void;
}

const DeleteJobButton: React.FC<DeleteJobButtonProps> = ({
  jobId,
  sectionId,
  refreshJobs,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const deleteCard = async () => {
    try {
      const response = await fetch("/api/job/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, sectionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      refreshJobs();
    } catch {
      alert("Error deleting job");
    }
  };

  return (
    <button
      onClick={(e) => {
        deleteCard();
        e.stopPropagation();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <Image
          src="/trashBin_light.png"
          width={20}
          height={20}
          alt="logo-trash-bin.png"
        />
      ) : (
        <Image
          src="/trashBin_light_hover.png"
          width={20}
          height={20}
          alt="logo-trash-bin.png"
        />
      )}
    </button>
  );
};

export default DeleteJobButton;
