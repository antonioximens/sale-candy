import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/Http-Error";

// aqui faz o tratamento para ver em qual caso o error cai 
export const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
}