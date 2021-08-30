import nextConnect from "next-connect";
import database from "./middleware/database";
import { NextApiResponse } from "next";
import authorize from "./middleware/authorize";

const handler = nextConnect();

handler.use(database);
handler.use(authorize);

handler.post(async (req: any, res: NextApiResponse) => {
  try {
    const { amount, description, checkUrl, date } = req.body;

    const depositData = {
      amount,
      description,
      checkUrl,
      date,
      status: 1,
      userId: req.user.sub,
    };

    const newData = await req.db.collection("deposits").insertOne(depositData);

    res.json({
      message: "Deposit realized!",
      newData,
    });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong." });
  }
});

handler.get(async (req: any, res: NextApiResponse) => {
  try {
    const transactions = await req.db
      .collection("deposits")
      .find({ userId: req.user.sub })
      .toArray();

    res.json(transactions);
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
});

export default handler;
