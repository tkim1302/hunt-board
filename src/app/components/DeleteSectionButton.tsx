"use client";

import Image from "next/image";
import { useState } from "react";
import useLoadingStore from "../store/loadingStore";

interface DeleteSectionButtonProps {
  sectionId: string;
  refreshJobs: () => Promise<void>;
}

const DeleteSectionButton: React.FC<DeleteSectionButtonProps> = ({
  sectionId,
  refreshJobs,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setIsLoading } = useLoadingStore();

  const deleteSection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/section/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete section");
      }
      await refreshJobs();
    } catch {
      alert("Error deleting section");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="opacity-50 dark:opacity-100"
      onClick={() => deleteSection()}
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

export default DeleteSectionButton;
