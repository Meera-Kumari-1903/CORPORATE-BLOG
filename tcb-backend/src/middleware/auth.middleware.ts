import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1️⃣ Get Authorization header
    const authHeader = req.headers.authorization;

    // 2️⃣ Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    // 3️⃣ Extract token (Bearer TOKEN)
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Token missing",
      });
    }

    // 4️⃣ Verify token
    const decoded = verifyToken(token);

    // 5️⃣ Attach user data to request
    (req as any).user = decoded;

    // 6️⃣ Continue to next middleware/route
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};