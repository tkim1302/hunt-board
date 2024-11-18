import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NavBar from "./components/NavBar";
import Section from "./components/Section";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <NavBar />
      <div className="flex">
        <Section sectionName="WISHLIST" />
        <Section sectionName="APPLIED" />
        <Section sectionName="INTERVIEW" />
        <Section sectionName="OFFER" />
        <Section sectionName="REJECTED" />
      </div>
    </div>
  );
};

export default Home;
