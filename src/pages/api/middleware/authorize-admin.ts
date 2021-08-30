import nextConnect from "next-connect";
import * as jwt from "jsonwebtoken";
import { getTokenCookie } from "../utils";

async function authorizeAdmin(req, res, next) {
  try {
    const token = getTokenCookie(req);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.role || decoded.role !== "admin") {
      return res.status(401).json({ message: "Insufficient role" });
    }
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized" });
  }
}

const middleware = nextConnect();

middleware.use(authorizeAdmin);

export default middleware;
