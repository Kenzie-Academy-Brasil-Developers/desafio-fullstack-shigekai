import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.error";
import { verify } from "jsonwebtoken";

export const validToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {authorization} = req.headers;

    if(!authorization) throw new AppError("Missing bearer token");

    const token: string = authorization.split(" ")[1];
    
    const decoded = verify(
        token,
        String(process.env.SECRET_KEY)
    );

    res.locals = {...res.locals, decoded}

    return next();
};