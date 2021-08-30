import nextConnect from "next-connect";
import database from "./middleware/database";
import { NextApiResponse } from "next";
import authorize from "./middleware/authorize";

const handler = nextConnect();

handler.use(database);
handler.use(authorize);

handler.post(async (req: any, res: NextApiResponse) => {
  try {
    const { amount, description, date } = req.body;

    const data = {
      amount,
      description,
      date,
      userId: req.user.sub,
    };

    const newData = await req.db.collection("purchases").insertOne(data);

    res.json({
      message: "Purchase realized!",
      newData,
    });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong." });
  }
});

handler.get(async (req: any, res: NextApiResponse) => {
  try {
    const transactions = await req.db
      .collection("purchases")
      .find({ userId: req.user.sub })
      .toArray();

    res.json(transactions);
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
});

export default handler;
