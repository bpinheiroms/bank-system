import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import database from "./middleware/database";
import { ObjectId } from "mongodb";
import authorizeAdmin from "./middleware/authorize-admin";

const handler = nextConnect();
handler.use(database);
handler.use(authorizeAdmin);

handler.get(async (req: any, res: NextApiResponse) => {
  try {
    const deposits = await req.db
      .collection("deposits")
      .find({ status: 1 })
      .toArray();
    res.json(deposits);
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
});

handler.put(async (req: any, res: NextApiResponse) => {
  try {
    const { _id } = req.body;

    await req.db
      .collection("deposits")
      .updateOne(
        { _id: new ObjectId(_id) },
        { $set: { status: req.body.status } },
        { upsert: true }
      )

    res.json({});
  } catch (err) {
    console.log(`err`, err);
    res.status(401).json({ message: "Not authorized" });
  }
});

export default handler;
