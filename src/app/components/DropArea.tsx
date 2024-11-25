"use client";

import { useState } from "react";

interface DropAreaProps {
  onDrop: () => void;
}

const DropArea: React.FC<DropAreaProps> = ({ onDrop }) => {
  const [showArea, setShowArea] = useState(false);

  return (
    <div
      onDragEnter={() => setShowArea(true)}
      onDragLeave={() => setShowArea(false)}
      onDrop={() => {
        onDrop();
        setShowArea(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={`${showArea ? "mb-4 flex h-32 w-60 items-center justify-center rounded-xl border border-gray-500 pb-3 pl-2 pr-2 pt-3 font-bold opacity-100 duration-200 ease-in-out" : "opacity-0"} dark:text-gray-200`}
    >
      Drop Here!
    </div>
  );
};

export default DropArea;
