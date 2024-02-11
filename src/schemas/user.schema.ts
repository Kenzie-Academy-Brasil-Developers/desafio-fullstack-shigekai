import { z } from "zod";
import { contactSchema } from "./contact.schema";

export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(120),
    email: z.string().email().max(120),
    password: z.string().max(256),
    phone: z.string().max(16),
    admin: z.boolean().default(false),
    createdAt: z.string()   
});

export const createUserSchema = userSchema.omit({
    id: true,
    createdAt: true
});

export const safeReturnUserSchema = userSchema.omit({
    password: true
});

export const safeReturnUpdateUserSchema = userSchema.pick({
    id: true,
    name: true,
    admin: true,
    createdAt: true
});

export const retrieveUserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(120),
    admin: z.boolean().default(false),
    createdAt: z.string(),
    userEmails: z.array(z.object({
        id: z.string(),
        email: z.string().email(),
        main: z.boolean(),
        updatedAt: z.string()
    })),
    userPhones: z.array(z.object({
        id: z.string(),
        phone: z.string(),
        updatedAt: z.string()
    }))
})

export const updateUserSchema = createUserSchema.pick({
    name: true,
    password: true
}).partial();

export const loginUserSchema = userSchema.pick({
    email: true,
    password: true
});

export const readAllUsersSchema = userSchema.pick({
    id: true,
    name: true,
    admin: true,
    createdAt: true
}).array();

