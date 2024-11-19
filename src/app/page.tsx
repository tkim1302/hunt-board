import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NavBar from "./components/NavBar";
import Section from "./components/Section";
import { connectDB } from "../../util/mongodb";
import { Section as SectionType } from "@/app/types/types";
import Modal from "./components/Modal";
import DetailForm from "./components/DetailForm";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const db = (await connectDB).db("HuntBoard");
  const result = await db.collection("Sections").findOne<{
    email: string;
    sections: SectionType[];
  }>({ email: session.user!.email });

  const defaultSections: SectionType[] = [
    { title: "WISHLIST", jobs: [] },
    { title: "APPLIED", jobs: [] },
    { title: "INTERVIEW", jobs: [] },
    { title: "OFFER", jobs: [] },
    { title: "REJECTED", jobs: [] },
  ];

  if (!result?.email) {
    await db.collection("Sections").insertOne({
      email: session.user!.email,
      sections: defaultSections,
    });
  }

  return (
    <div>
      <NavBar />
      <div className="flex">
        {result &&
          result.sections.map((section) => (
            <Section key={section.title} sectionName={section.title} />
          ))}
      </div>
      <Modal>
        <DetailForm />
      </Modal>
    </div>
  );
};

export default Home;
