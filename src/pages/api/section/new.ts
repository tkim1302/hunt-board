import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../../util/mongodb";
import { Section } from "@/app/types/types";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;

    const db = (await connectDB).db("HuntBoard");

    const result = await db
      .collection("Sections")
      .findOne<{ email: string; sections: Section[] }>({
        email,
      });

    result!.sections.push({
      _id: new ObjectId().toString(),
      title: "",
      jobs: [],
    });

    await db
      .collection("Sections")
      .updateOne(
        { email },
        { $set: { sections: result?.sections, lastUpdated: new Date() } },
      );

    return res.status(200).redirect("/");
  }
};

export default handler;
