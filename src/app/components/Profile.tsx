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
    <div className="flex w-16 items-center justify-center text-center">
      {isOptionOpen ? (
        <button
          onMouseOut={() => setIsOptionOpen(false)}
          className="h-12 w-24 rounded-xl bg-blue-500 pl-2 pr-2 text-white"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="h-12 w-12 rounded-full bg-blue-500 font-semibold text-white"
          onClick={() => setIsOptionOpen(true)}
        >
          {getInitials(session?.user!.name)}
        </button>
      )}
    </div>
  );
};

export default Profile;
