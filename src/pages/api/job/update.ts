import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../../util/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Section } from "@/app/types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { sourceSection, destinationSection, sourceIndex, destinationIndex } =
      req.body;

    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;

    const db = (await connectDB).db("HuntBoard");
    const result = await db.collection("Sections").findOne({ email });

    if (!result) {
      return res.status(404).json({ error: "Email not found" });
    }

    const source = result.sections.find(
      (ele: Section) => ele._id === sourceSection,
    );
    const destination = result.sections.find(
      (ele: Section) => ele._id === destinationSection,
    );

    if (!source || !destination) {
      return res.status(404).json({ error: "Section not found" });
    }

    const [movedJob] = source.jobs.splice(sourceIndex, 1);
    destination.jobs.splice(destinationIndex, 0, movedJob);

    await db
      .collection("Sections")
      .updateOne({ email }, { $set: { sections: result.sections } });

    return res.status(200).redirect("/");
  }
};

export default handler;
