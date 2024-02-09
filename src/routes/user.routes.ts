import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserSchema, loginUserSchema, updateUserSchema } from "../schemas/user.schema";
import { createUserController, deleteUserController, loginUserController, readAllUsersController, retrieveUserController, updateUserController } from "../controllers/user.controller";
import { uniqueConstraint } from "../middlewares/uniqueConstraint.middleware";
import { validToken } from "../middlewares/validToken.middleware";
import { admin } from "../middlewares/admin.middleware";
import { userEmailsRepository, userPhonesRepository, userRepository } from "../repositories";
import { adminOrOwner } from "../middlewares/adminOrOwner.middleware";
import { validId } from "../middlewares/validId.middleware";

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