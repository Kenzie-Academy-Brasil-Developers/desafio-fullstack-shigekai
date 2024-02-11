import { z } from "zod";
import { createUserSchema, loginUserSchema, readAllUsersSchema, safeReturnUserSchema, updateUserSchema } from "../schemas/user.schema";
import { newUserPhoneSchema } from "../schemas/userPhones.schema";
import { newUserEmailSchema } from "../schemas/userEmails.schema";

export type ICreateUser = z.infer<typeof createUserSchema>;
export type ISafeReturnUser = z.infer<typeof safeReturnUserSchema>;
export type ILoginUser = z.infer<typeof loginUserSchema>;
export type IReadAllUsers = z.infer<typeof readAllUsersSchema>;
export type IUpdateUser = z.infer<typeof updateUserSchema>;
export type INewUserEmail = z.infer<typeof newUserEmailSchema>;
export type INewUserPhone = z.infer<typeof newUserPhoneSchema>;
