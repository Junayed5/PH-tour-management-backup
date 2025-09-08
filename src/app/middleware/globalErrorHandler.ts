/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../erroHelpers/AppError";

export const globalError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = `Something Went Wrong!!`;

  if (err.code === 11000) {
    const duplicate = err.message.match(/"([^"]*)"/)
    statusCode = 400
    message = `${duplicate[1]} already exist`
  }else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid Mongo Id provided"
  }
    else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = `${err.message}`;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
