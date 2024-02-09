import { z } from "zod";
import { createContactSchema } from "../schemas/contact.schema";

export type ICreateContact = z.infer<typeof createContactSchema>;