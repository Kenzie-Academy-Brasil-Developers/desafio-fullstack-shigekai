import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createContactSchema } from "../schemas/contact.schema";
import { createContactController, readContactsByUserController, retrieveContactController } from "../controllers/contact.controller";
import { validToken } from "../middlewares/validToken.middleware";
import { adminOrContactRelated } from "../middlewares/adminOrUserRelated.middleware";
import { validId } from "../middlewares/validId.middleware";
import { userRepository } from "../repositories";

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
    adminOrContactRelated,
    retrieveContactController
);

