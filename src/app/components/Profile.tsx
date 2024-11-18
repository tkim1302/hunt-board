"use client";

import { useState } from "react";

const Profile: React.FC = () => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  return (
    <div className="relative w-16 text-center">
      <button onClick={() => setIsOptionOpen(!isOptionOpen)}>Profile</button>
      {isOptionOpen && (
        <button className="absolute left-0 top-8 border border-black bg-blue-500">
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Profile;
