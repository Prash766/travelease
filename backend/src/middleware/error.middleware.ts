import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let message = "Something went wrong";
  let status = 500;

  if (err instanceof ApiError) {
    message = err.message;
    status = err.status;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(status).json({ message });
  next(err);
};

export default errorMiddleware;