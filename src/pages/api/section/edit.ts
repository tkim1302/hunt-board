import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../../util/mongodb";
import { Section } from "@/app/types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { sectionId, newTitle } = req.body;

    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;

    const db = (await connectDB).db("HuntBoard");
    const result = await db.collection("Sections").findOne({ email });

    if (!result) {
      return res.status(404).json({ error: "Email not found" });
    }

    const sectionIndex = result.sections.findIndex(
      (ele: Section) => ele._id === sectionId,
    );

    if (sectionIndex === -1) {
      return res.status(404).json({ error: "Section not found" });
    }

    result.sections[sectionIndex] = {
      ...result.sections[sectionIndex],
      title: newTitle,
    };

    await db
      .collection("Sections")
      .updateOne(
        { email },
        { $set: { sections: result.sections, lastUpdated: new Date() } },
      );

    return res.status(200).redirect("/");
  }
};

export default handler;
