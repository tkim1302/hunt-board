"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface ProfileProps {
  session: Session | null;
}

const getInitials = (name: string | null | undefined) => {
  if (!name) return;

  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join(" ");
};

const Profile: React.FC<ProfileProps> = ({ session }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  return (
    <div className="relative flex w-16 items-center justify-center text-center">
      <button
        className="h-11 w-11 rounded-full bg-orange-500 text-white"
        onClick={() => setIsOptionOpen(!isOptionOpen)}
      >
        {getInitials(session?.user!.name)}
      </button>
      {isOptionOpen && (
        <button
          className="absolute left-0 top-8 border border-black bg-blue-500"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Profile;
