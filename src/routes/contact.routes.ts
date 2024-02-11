import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createContactSchema, updateContactByIdSchema } from "../schemas/contact.schema";
import { createContactController, deleteContactController, deleteContactEmailController, deleteContactPhoneController, newContactEmailController, newContactPhoneController, readContactsByUserController, retrieveContactController, updateContactController } from "../controllers/contact.controller";
import { validToken } from "../middlewares/validToken.middleware";
import { adminOrContactRelated } from "../middlewares/adminOrContactRelated.middleware";
import { validId } from "../middlewares/validId.middleware";
import { contactEmailsRepository, contactPhonesRepository, contactRepository } from "../repositories";
import { newContactEmailSchema } from "../schemas/contactEmails.schema";
import { newContactPhoneSchema } from "../schemas/contactPhones.schema";

export const contactRouter: Router = Router();

contactRouter.post(
    "/",
    validToken,
    validateBody(createContactSchema),
    createContactController
);

contactRouter.get(
    "/user",
    validToken,
    readContactsByUserController
);

contactRouter.get(
    "/:contactId",
    validToken,
    validId("contactId", contactRepository),
    adminOrContactRelated,
    retrieveContactController
);

contactRouter.patch(
    "/:contactId",
    validToken,
    validateBody(updateContactByIdSchema),
    validId("contactId", contactRepository),
    adminOrContactRelated,
    updateContactController
);

contactRouter.delete(
    "/:contactId",
    validToken,
    validId("contactId", contactRepository),
    deleteContactController
);

contactRouter.post(
    "/:contactId/email",
    validToken,
    validateBody(newContactEmailSchema),
    validId("contactId", contactRepository),
    adminOrContactRelated,
    newContactEmailController
);

contactRouter.delete(
    "/:contactEmailId/email",
    validToken,
    validId("contactEmailId", contactEmailsRepository),
    deleteContactEmailController
);

contactRouter.post(
    "/:contactId/phone",
    validToken,
    validateBody(newContactPhoneSchema),
    validId("contactId", contactRepository),
    adminOrContactRelated,
    newContactPhoneController
);

contactRouter.delete(
    "/:contactPhoneId/phone",
    validToken,
    validId("contactPhoneId", contactPhonesRepository),
    deleteContactPhoneController
);
