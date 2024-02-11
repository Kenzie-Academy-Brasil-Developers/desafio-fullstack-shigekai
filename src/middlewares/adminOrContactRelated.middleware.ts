import { NextFunction, Request, Response } from "express"
import { contactRepository } from "../repositories";
import { AppError } from "../errors/AppError.error";

export const adminOrContactRelated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {admin, sub} = res.locals.decoded;
    const contactId = req.params.contactId;

    const contact = await contactRepository.findOne({
        where: {
            id: contactId
        },
        relations: {
            user: true
        }
    });

    if(admin || contact!.user.id == sub) return next();

    throw new AppError(
        "Insufficient permissions, must be admin or contact related", 401
    );   
};