import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/Http-Error";

// aqui faz o tratamento para ver em qual caso o error cai 
export const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    if(error instanceof HttpError) res.status(error.statusCode).json({message: error.message}) // verifica se é da classe personalizada
    if(error instanceof Error) res.status(500).json({message: error.message}) // verifica se é um erro generico
    else res.status(500).json({message: "Internal Server Error"}) // se não for nenhum ele manda um erro padrao
}