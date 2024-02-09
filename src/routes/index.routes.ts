import { Router } from "express";
import { userRouter } from "./user.routes";
import { contactRouter } from "./contact.routes";

export const router: Router = Router();

router.use("/users", userRouter);
router.use("/contacts", contactRouter);