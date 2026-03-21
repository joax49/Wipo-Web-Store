import { ErrorRequestHandler } from "express";
import { AppError } from "./appError.js";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({
            error: {
                code: err.code,
                message: err.message
            }
        });
    }

    console.error(err);

    return res.status(500).json({
        error: {
            code: "INTERNAL_ERROR",
            message: "Something went wrong"
        }
    });
};