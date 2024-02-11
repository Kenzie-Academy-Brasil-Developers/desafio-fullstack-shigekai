import { Request, Response } from "express";
import { createContactService, deleteContactEmailService, deleteContactPhoneService, deleteContactService, newContactEmailService, newContactPhoneService, readContactsByUserService, retrieveContactService, updateContactService } from "../services/contact.service";

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

export const updateContactController = async (
    req: Request,
    res: Response
) => {

    const updatedContact = await updateContactService(
        res.locals.entity,
        req.body
    );

    return res.status(200).json(updatedContact);
};

export const deleteContactController = async (
    req: Request,
    res: Response
) => {
    await deleteContactService(res.locals.entity);

    return res.status(204).json()
};

export const newContactEmailController = async (
    req: Request,
    res: Response
) => {

    const newContactEmail = await newContactEmailService(
        req.body,
        res.locals.entity
    );

    return res.status(201).json(newContactEmail)
};

export const deleteContactEmailController = async (
    req: Request,
    res: Response
) => {
    await deleteContactEmailService(res.locals.entity);

    return res.status(204).json();
};

export const newContactPhoneController = async (
    req: Request,
    res: Response
) => {

    const newContactPhone = await newContactPhoneService(
        req.body,
        res.locals.entity
    );

    return res.status(201).json(newContactPhone)
};

export const deleteContactPhoneController = async (
    req: Request,
    res: Response
) => {
    await deleteContactPhoneService(res.locals.entity);

    return res.status(204).json();
};