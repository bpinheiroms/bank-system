import nextConnect from "next-connect";
import database from "./middleware/database";
import { createToken, hashPassword, setTokenCookie } from "./utils";
import { NextApiResponse } from "next";
import * as jwtDecode from "jwt-decode";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(database);

handler.post(async (req: any, res: NextApiResponse) => {
  try {
    const { email, username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const userData = {
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
      role: "user",
    };

    const existingEmail = await req.db.collection("users").findOne({
      email: userData.email,
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await req.db.collection("users").insertOne(userData);

    const insertedUser = await req.db
      .collection("users")
      .findOne({ _id: new ObjectId(newUser.insertedId) });

    if (insertedUser) {
      const { _id, username, email, role } = insertedUser;

      const userInfo = {
        _id,
        username,
        email,
        role,
      };

      const token = createToken(userInfo);
      const decoded = jwtDecode(token);
      const { exp } = decoded;

      setTokenCookie(res, token);

      res.json({
        message: "User created!",
        userInfo,
        expiresAt: exp,
      });
    } else {
      res.status(403).json({
        message: "Wrong email or password.",
      });
    }
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong." });
  }
});

export default handler;
