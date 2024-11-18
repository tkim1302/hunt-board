import { getServerSession } from "next-auth";
import GoogleSignIn from "./GoogleSignIn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

const page: React.FC = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full justify-around">
      <div className="flex basis-[65%] flex-col items-center justify-center gap-24 border-r border-gray-600">
        <h1 className="font-abril text-8xl text-blue-500">HuntBoard</h1>
        <h2 className="w-3/5 text-center text-5xl">
          A POWERFUL TOOL TO TRACK YOUR JOB APPLICATIONS
        </h2>
      </div>
      <div className="flex basis-[35%] flex-col items-center justify-center gap-16">
        <h4 className="text-4xl font-semibold">LET&apos;S GET STARTED!</h4>
        <GoogleSignIn />
      </div>
    </div>
  );
};

export default page;
