import { NextApiRequest, NextApiResponse } from "next";
import { Job, Section, Collection } from "@/app/types/types";
import { connectDB } from "../../../../util/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { jobTitle, company, postURL, salary, location, deadline, section } =
      req.body;

    if (jobTitle === "" || company === "") {
      return res.status(500).json("Title and Company are required");
    }

    const session = await getServerSession(req, res, authOptions);
    const email = session!.user!.email!;

    const db = (await connectDB).db("HuntBoard");
    const result = await db
      .collection<Collection>("Sections")
      .findOne({ email });

    if (!result) {
      return res.status(404).json({ error: "Email Not Found" });
    }

    const sectionIndex = result.sections.findIndex(
      (ele: Section) => ele._id === section,
    );

    const newJob: Job = {
      _id: new ObjectId().toString(),
      jobTitle,
      company,
      postURL,
      salary,
      location,
      deadline,
    };

    if (sectionIndex !== -1) {
      result.sections[sectionIndex].jobs =
        result.sections[sectionIndex].jobs || [];
      result.sections[sectionIndex].jobs.push(newJob);
    } else {
      const newSection = {
        _id: new ObjectId().toString(),
        title: section,
        jobs: [newJob],
      };
      result.sections.push(newSection);
    }

    await db
      .collection("Sections")
      .updateOne({ email }, { $set: { sections: result.sections } });

    return res.status(200).redirect("/");
  }
};

export default handler;
