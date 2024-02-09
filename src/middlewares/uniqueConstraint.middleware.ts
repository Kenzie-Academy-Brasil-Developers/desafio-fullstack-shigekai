import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.error";
import { Repository } from "typeorm";


export const uniqueConstraint = (
    repository: Repository<any>,
    constraint: string
    ) =>
    async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {

        const constraintValue = req.body[constraint];

        const foundEntity = await repository.findOne({
            where: {
                [constraint]: constraintValue        
            }
        });

        if(foundEntity) throw new AppError(`${constraint} must be unique`, 400);

        return next();
    };