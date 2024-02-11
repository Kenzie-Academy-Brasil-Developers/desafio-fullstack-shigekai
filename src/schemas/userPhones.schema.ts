import { z } from "zod";
import { contactSchema } from "./contact.schema";
import { userSchema } from "./user.schema";

export const newUserPhoneSchema = userSchema.pick({
    phone: true
});

export const returnNewUserPhoneSchema = z.object({
    id: z.string().uuid(),
    phone: z.string().max(16),
    user: z.object({
        id: z.string().uuid(),
        name: z.string().max(120),
        admin: z.boolean()
    })
});