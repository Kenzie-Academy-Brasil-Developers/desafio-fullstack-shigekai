import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserSchema, loginUserSchema, updateUserSchema } from "../schemas/user.schema";
import { createUserController, deleteUserController, deleteUserEmailController, deleteUserPhoneController, loginUserController, newUserEmailController, newUserPhoneController, readAllUsersController, retrieveUserController, updateUserController } from "../controllers/user.controller";
import { uniqueConstraint } from "../middlewares/uniqueConstraint.middleware";
import { validToken } from "../middlewares/validToken.middleware";
import { admin } from "../middlewares/admin.middleware";
import { userEmailsRepository, userPhonesRepository, userRepository } from "../repositories";
import { adminOrOwner } from "../middlewares/adminOrOwner.middleware";
import { validId } from "../middlewares/validId.middleware";
import { newUserEmailSchema } from "../schemas/userEmails.schema";
import { adminOrContactRelated } from "../middlewares/adminOrContactRelated.middleware";
import { newUserPhoneSchema } from "../schemas/userPhones.schema";

export const userRouter: Router = Router();

userRouter.post(
    "/",
    validateBody(createUserSchema),
    uniqueConstraint(userEmailsRepository, "email"),
    uniqueConstraint(userPhonesRepository, "phone"),
    createUserController
);

userRouter.post(
    "/login",
    validateBody(loginUserSchema),
    loginUserController
);

userRouter.get(
    "/",
    validToken,
    admin,
    readAllUsersController
);

userRouter.get(
    "/:userId",
    validToken,
    adminOrOwner,
    validId("userId", userRepository),
    retrieveUserController
)

userRouter.patch(
    "/:userId",
    validToken,
    adminOrOwner,
    validId("userId", userRepository),
    validateBody(updateUserSchema),
    updateUserController
);

userRouter.delete(
    "/:userId",
    validToken,
    adminOrOwner,
    validId("userId", userRepository),
    deleteUserController
);

userRouter.post(
    "/:userId/email",
    validToken,
    validateBody(newUserEmailSchema),
    uniqueConstraint(userEmailsRepository, "email"),
    validId("userId", userRepository),
    adminOrOwner,
    newUserEmailController
);

userRouter.delete(
    "/:userEmailId/email",
    validToken,
    validId("userEmailId", userEmailsRepository),
    deleteUserEmailController
);

userRouter.post(
    "/:userId/phone",
    validToken,
    validateBody(newUserPhoneSchema),
    uniqueConstraint(userPhonesRepository, "phone"),
    validId("userId", userRepository),
    adminOrOwner,
    newUserPhoneController
);

userRouter.delete(
    "/:userPhoneId/phone",
    validToken,
    validId("userPhoneId", userPhonesRepository),
    deleteUserPhoneController
);
