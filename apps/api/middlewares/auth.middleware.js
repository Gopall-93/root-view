import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request. No token found.",
      });
    }

    const decoded = User.verifyToken(token);

    if (!decoded?.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session.",
      });
    }
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};