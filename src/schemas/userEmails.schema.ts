import { z } from "zod";
import { contactSchema } from "./contact.schema";
import { userSchema } from "./user.schema";

export const newUserEmailSchema = userSchema.pick({
    email: true
});

export const returnNewUserEmailSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email().max(120),
    user: z.object({
        id: z.string().uuid(),
        name: z.string().max(120),
        admin: z.boolean()
    })
})