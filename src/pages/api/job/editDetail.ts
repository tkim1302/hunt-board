import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../../util/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Job, Section } from "@/app/types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      _id,
      jobTitle,
      company,
      postURL,
      salary,
      location,
      deadline,
      section,
    } = req.body;

    if (jobTitle === "" || company === "") {
      return res.status(500).json("Title and Company are required");
    }

    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;

    const db = (await connectDB).db("HuntBoard");
    const result = await db.collection("Sections").findOne({ email });

    if (!result) {
      return res.status(404).json({ error: "Email not found" });
    }

    const sectionIndex = result.sections.findIndex(
      (ele: Section) => ele.title === section,
    );

    if (sectionIndex === -1) {
      return res.status(404).json({ error: "Section not found" });
    }

    const jobIndex = result.sections[sectionIndex].jobs.findIndex(
      (job: Job) => job._id === _id,
    );

    if (jobIndex === -1) {
      return res.status(404).json({ error: "Job not found" });
    }

    result.sections[sectionIndex].jobs[jobIndex] = {
      ...result.sections[sectionIndex].jobs[jobIndex],
      jobTitle,
      company,
      postURL,
      salary,
      location,
      deadline,
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
