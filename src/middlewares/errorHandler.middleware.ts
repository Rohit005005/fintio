import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/app-error";
import { ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";

const formatZodError = (res: Response, error: ZodError) => {
  const errors = error.issues.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation Failed !!",
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
    errors: errors,
  });
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log("########## Error occured on Path :", req.path, "Error:", error);

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error !!",
    error: error?.message || "Unknown Error Occured !!",
  });
};
