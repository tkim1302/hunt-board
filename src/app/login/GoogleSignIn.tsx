"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleSignIn: React.FC = () => {
  return (
    <div
      onClick={() => {
        signIn();
      }}
      className="flex cursor-pointer gap-6 rounded-2xl border border-black p-6"
    >
      <Image src="/googleLogo.svg" width={40} height={40} alt="logo-google" />
      <h4 className="text-3xl">Sign In With Google</h4>
    </div>
  );
};

export default GoogleSignIn;
