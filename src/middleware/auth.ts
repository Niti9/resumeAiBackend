import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request type to include 'user'
export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret") as any;
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};