import { z } from "zod";
import { contactSchema } from "./contact.schema";

export const newContactPhoneSchema = contactSchema.pick({
    phone: true
});

export const returnNewContactPhoneSchema = z.object({
    id: z.string().uuid(),
    phone: z.string().max(16),
    contact: z.object({
        id: z.string().uuid(),
        name: z.string().max(120)
    })
});