import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Layout from "./Layout";

const page: React.FC = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full justify-around">
      <Layout />
    </div>
  );
};

export default page;
