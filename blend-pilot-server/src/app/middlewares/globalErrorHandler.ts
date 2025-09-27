import { NextFunction, Request, Response } from "express";
import AppErr from "../errorhelpers/AppError";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = err.message || "Something went wrong!"; // Changed from err.massage

  if (err instanceof AppErr) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};
