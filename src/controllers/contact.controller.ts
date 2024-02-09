import { Request, Response } from "express";
import { createContactService, readContactsByUserService, retrieveContactService } from "../services/contact.service";

export const createContactController = async(
    req: Request,
    res: Response
) => {

   const newContact = await createContactService(
    req.body,
    res.locals.decoded.sub
    );

   return res.status(200).json(newContact);
};

export const readContactsByUserController = async (
    req: Request,
    res: Response
) => {
    const userContacts = await readContactsByUserService(res.locals.decoded.sub);

    return res.status(200).json(userContacts);
};

export const retrieveContactController = async(
    req: Request,
    res: Response
) => {
    const contact = await retrieveContactService(req.params.contactId);

    return res.status(200).json(contact);
};