import { z } from "zod";
import { safeReturnUserSchema } from "./user.schema";

export const contactSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(120),
    email: z.string().email().max(120),
    phone: z.string().max(16),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.string().uuid()
});

export const createContactSchema = contactSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true
});

export const returnContactSchema = contactSchema.omit({
    userId: true
});

export const readContactsByUserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(120),
    admin: z.boolean().default(false),
    createdAt: z.string(),
    contacts: z.array(z.object({
        id: z.string().uuid(),
        name: z.string(),
    }))
})

export const updateContactByIdSchema = createContactSchema.partial();

export const retrieveContactSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(120),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    contactEmails: z.array(z.object({
        id: z.string(),
        email: z.string().email(),
        updatedAt: z.string()
    })),
    contactPhones: z.array(z.object({
        id: z.string(),
        phone: z.string(),
        updatedAt: z.string()
    }))
})