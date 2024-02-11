import { z } from "zod";
import { contactSchema } from "./contact.schema";

export const newContactEmailSchema = contactSchema.pick({
    email: true
});

export const returnNewContactEmailSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email().max(120),
    contact: z.object({
        id: z.string().uuid(),
        name: z.string().max(120)
    })
})