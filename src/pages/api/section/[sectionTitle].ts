import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../../util/mongodb";
import { Section } from "@/app/types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    const { sectionTitle } = req.query;

    const email = session!.user!.email!;

    const db = (await connectDB).db("HuntBoard");
    const result = await db.collection("Sections").findOne({
      email,
    });

    if (!result) {
      return res.status(404).json({ error: "Email Not Found" });
    }

    const section = result.sections.find(
      (ele: Section) => ele.title === sectionTitle,
    );

    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    return res.status(200).json(section.jobs);
  }
};

export default handler;
