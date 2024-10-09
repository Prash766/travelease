import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";

const validateToken = asyncHandler(async (req, res, next) => {
  let token = req.cookies["auth_token"] || req.header("authorization");

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    throw new ApiError("Invalid Token or Token expired", 400);
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    if (!decodedToken) {
      throw new ApiError("Invalid Token or Token Has Expired", 400);
    }

    req.user = (decodedToken as JwtPayload).userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error:
        error instanceof jwt.JsonWebTokenError
          ? error.message
          : "Token verification failed",
    });
  }
});

export { validateToken };
