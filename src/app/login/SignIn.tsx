"use client";

import { signIn } from "next-auth/react";

const SignIn: React.FC = () => {
  return (
    <div
      onClick={() => {
        signIn();
      }}
      className="flex cursor-pointer gap-6 rounded-2xl border-2 border-black p-6 dark:border-gray-200"
    >
      <h4 className="text-4xl font-semibold dark:text-gray-200">
        LET&apos;S GET STARTED!
      </h4>
    </div>
  );
};

export default SignIn;
