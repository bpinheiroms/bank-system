import nextConnect from "next-connect";
import authorize from "./middleware/authorize";
import { NextApiResponse } from "next";
import database from "./middleware/database";

const handler = nextConnect();
handler.use(database);
handler.use(authorize);

handler.get(async (req: any, res: NextApiResponse) => {
  try {
    const purchases = await req.db
      .collection("purchases")
      .find({ userId: req.user.sub })
      .sort({ date: -1 })
      .toArray();

    const deposits = await req.db
      .collection("deposits")
      .find({ userId: req.user.sub, status: 2 })
      .sort({ date: -1 })
      .toArray();

    res.json(purchases.concat(deposits));
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
});

export default handler;
