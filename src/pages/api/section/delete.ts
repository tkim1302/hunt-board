import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../../util/mongodb";
import { Section } from "@/app/types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { sectionId } = req.body;

    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;

    const db = (await connectDB).db("HuntBoard");
    const result = await db.collection("Sections").findOne({ email });

    if (!result) {
      return res.status(404).json({ error: "Email not found" });
    }

    result.sections = result.sections.filter(
      (section: Section) => section._id !== sectionId,
    );

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
