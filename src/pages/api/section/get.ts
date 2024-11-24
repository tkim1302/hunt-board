import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Job, Section as SectionType } from "@/app/types/types";
import { connectDB } from "../../../../util/mongodb";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;

    const db = (await connectDB).db("HuntBoard");

    let result = await db.collection("Sections").findOne<{
      email: string;
      sections: SectionType[];
    }>({ email });

    const createDefaultJob = (): Job => ({
      _id: new ObjectId().toString(),
      jobTitle: "Try Drag and Drop!",
      company: "Default job card",
    });

    const defaultSections: SectionType[] = [
      {
        _id: new ObjectId().toString(),
        title: "WISHLIST",
        jobs: [createDefaultJob(), createDefaultJob()],
      },
      {
        _id: new ObjectId().toString(),
        title: "APPLIED",
        jobs: [createDefaultJob(), createDefaultJob()],
      },
      {
        _id: new ObjectId().toString(),
        title: "INTERVIEW",
        jobs: [createDefaultJob(), createDefaultJob()],
      },
      { _id: new ObjectId().toString(), title: "OFFER", jobs: [] },
      { _id: new ObjectId().toString(), title: "REJECTED", jobs: [] },
    ];

    if (!result?.email) {
      await db.collection("Sections").insertOne({
        email: session!.user!.email,
        sections: defaultSections,
      });
      result = await db.collection("Sections").findOne<{
        email: string;
        sections: SectionType[];
      }>({ email });
    }

    return res.status(200).json(result);
  }
};

export default handler;
