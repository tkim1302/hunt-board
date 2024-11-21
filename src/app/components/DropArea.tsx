"use client";

import { useState } from "react";

interface AreaInterface {
  onDrop: () => void;
}

const DropArea: React.FC<AreaInterface> = ({ onDrop }) => {
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
      className={`${showArea ? "mt-10 h-20 w-48 rounded-xl border border-gray-500 pb-3 pl-2 pr-2 pt-3 text-center opacity-100 duration-200 ease-in-out" : "opacity-0"} `}
    >
      Drop Here
    </div>
  );
};

export default DropArea;
