import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppError } from "../errors/AppError.error";

export const validId = (idParam: string, repository: Repository<any>) => async(
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const entityId: string = req.params[idParam];

    const uuidRegex: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;


    if(!uuidRegex.test(entityId)){
        throw new AppError("Id malformed")
    };

    const entity = await repository.findOne({
        where: {
            id: entityId
        }
    });

    if(!entity) throw new AppError(`${String(idParam).replace("Id", "")} not found`);

    res.locals = {...res.locals, entity}
    return next();
};