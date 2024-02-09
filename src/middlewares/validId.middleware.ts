import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppError } from "../errors/AppError.error";

export const validId = (idParam: string, repository: Repository<any>) => async(
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const entityId: string = req.params[idParam];

    const entity = await repository.findOneBy({id: entityId});

    if(!entity) throw new AppError(`
    ${String(repository).replace("Repository", "")},
    not found
    `);

    res.locals = {...res.locals, entity}
    return next();
};