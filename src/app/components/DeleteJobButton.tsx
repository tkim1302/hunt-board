"use client";

import Image from "next/image";
import { useState } from "react";
import useLoadingStore from "../store/loadingStore";

interface DeleteJobButtonProps {
  jobId: string;
  sectionId: string;
  refreshJobs: () => Promise<void>;
}

const DeleteJobButton: React.FC<DeleteJobButtonProps> = ({
  jobId,
  sectionId,
  refreshJobs,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setIsLoading } = useLoadingStore();

  const deleteCard = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/job/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, sectionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      await refreshJobs();
    } catch {
      alert("Error deleting job");
    } finally {
      setIsLoading(false);
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
          src="/trashBin_light.webp"
          width={20}
          height={20}
          alt="logo-trash-bin.webp"
        />
      ) : (
        <Image
          src="/trashBin_light_hover.webp"
          width={20}
          height={20}
          alt="logo-trash-bin.webp"
        />
      )}
    </button>
  );
};

export default DeleteJobButton;
