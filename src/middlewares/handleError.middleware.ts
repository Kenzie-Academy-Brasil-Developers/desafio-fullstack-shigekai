import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.error";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const handleError = (
    error: Error,
    req:  Request,
    res: Response,
    next: NextFunction
) => {
    if(error instanceof AppError){
        return res.status(error.status).json({"details": error.message})
    }else if(error instanceof ZodError){
        return res.status(400).json(error.flatten().fieldErrors)
    }else if(error instanceof JsonWebTokenError){
        return res.status(401).json({"details": error.message})
    }

    console.log(error);

    return res.status(500).json({"message": "Internal server error"})
};