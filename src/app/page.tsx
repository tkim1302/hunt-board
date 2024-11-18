import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NavBar from "./components/NavBar";
import Section from "./components/Section";
import { connectDB } from "../../util/mongodb";
import { Section as SectionType } from "@/app/types/types";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const db = (await connectDB).db("HuntBoard");

  let result = await db.collection("Sections").findOne<{
    email: string;
    sections: SectionType[];
  }>({ email: session!.user!.email });

  return (
    <div>
      <NavBar />
      <div className="flex">
        {result &&
          result.sections.map((section) => (
            <Section key={section.title} sectionName={section.title} />
          ))}
      </div>
    </div>
  );
};

export default Home;
