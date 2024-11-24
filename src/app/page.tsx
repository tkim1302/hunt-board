import NavBar from "./components/NavBar";
import SectionList from "./components/SectionList";
import Modal from "./components/Modal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex h-screen flex-col dark:bg-gray-800">
      <div className="basis-[10%]">
        <NavBar />
      </div>
      <div className="basis-[90%]">
        <SectionList />
        <Modal />
      </div>
    </div>
  );
};

export default Home;
