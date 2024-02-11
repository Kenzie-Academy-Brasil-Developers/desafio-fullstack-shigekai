import { z } from "zod";
import { createContactSchema } from "../schemas/contact.schema";
import { newContactEmailSchema } from "../schemas/contactEmails.schema";
import { newContactPhoneSchema } from "../schemas/contactPhones.schema";

export type ICreateContact = z.infer<typeof createContactSchema>;
export type INewContactEmail = z.infer<typeof newContactEmailSchema>;
export type INewContactPhone = z.infer<typeof newContactPhoneSchema>;