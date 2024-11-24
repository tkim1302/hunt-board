"use client";

import { signIn } from "next-auth/react";

const SignIn: React.FC = () => {
  return (
    <div
      onClick={() => {
        signIn();
      }}
      className="flex cursor-pointer gap-6 rounded-2xl border border-black p-6"
    >
      <h4 className="text-4xl font-semibold">LET'S GET STARTED!</h4>
    </div>
  );
};

export default SignIn;
