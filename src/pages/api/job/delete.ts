import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../../util/mongodb";
import { Job, Section } from "@/app/types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { jobId, sectionTitle } = req.body;

    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;

    const db = (await connectDB).db("HuntBoard");
    const result = await db.collection("Sections").findOne({ email });

    if (!result) {
      return res.status(404).json({ error: "Email not found" });
    }

    const sectionIndex = result.sections.findIndex(
      (ele: Section) => ele.title === sectionTitle,
    );

    if (sectionIndex !== -1) {
      result.sections[sectionIndex].jobs = result.sections[
        sectionIndex
      ].jobs.filter((job: Job) => job.jobTitle !== jobId);
    } else {
      return res.status(404).json({ error: "Section Not Found" });
    }

    await db
      .collection("Sections")
      .updateOne({ email }, { $set: { sections: result.sections } });

    return res.status(200).redirect("/");
  }
};

export default handler;
