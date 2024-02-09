import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.error";

export const adminOrOwner = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const {admin, sub} = res.locals.decoded;
    const {userId} = req.params;
 
    if(admin || userId == sub) return next();

    throw new AppError(
    "Insufficient Permissions, must be account owner or admin", 401
    );
};