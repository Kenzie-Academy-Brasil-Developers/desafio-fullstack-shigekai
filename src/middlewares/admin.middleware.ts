import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.error";

export const admin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const {admin} = res.locals.decoded

    if(!admin) throw new AppError("Insufficient permissions", 400);

    return next();
};