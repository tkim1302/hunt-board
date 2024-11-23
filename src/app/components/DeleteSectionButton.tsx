"use client";

import Image from "next/image";
import { useState } from "react";

interface DeleteSectionButtonProps {
  sectionId: string;
  refreshJobs: () => void;
}

const DeleteSectionButton: React.FC<DeleteSectionButtonProps> = ({
  sectionId,
  refreshJobs,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const deleteSection = async () => {
    try {
      const response = await fetch("/api/section/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete section");
      }
      refreshJobs();
    } catch {
      alert("Error deleting section");
    }
  };

  return (
    <button
      onClick={() => deleteSection()}
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

export default DeleteSectionButton;
