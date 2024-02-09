import { Contact } from "../entities/Contact.entity";
import { ContactEmails } from "../entities/ContactEmails.entity";
import { ContactPhones } from "../entities/ContactPhones.entity";
import { User } from "../entities/User.entity";
import { ICreateContact } from "../interfaces/contact.interface";
import { contactEmailsRepository, contactPhonesRepository, contactRepository, userRepository} from "../repositories";
import { contactSchema, readContactsByUserSchema, retrieveContactSchema, returnContactSchema } from "../schemas/contact.schema";

export const createContactService = async (
    data: ICreateContact,
    userId: string
    ) => {
    const {email, phone, ...contact} = data;


    const user: User | null = await userRepository.findOneBy({id: userId});

    const newContact: Contact = contactRepository.create({
        ...contact,
        user: user!
    });

    await contactRepository.save(newContact);

    const newContactEmail: ContactEmails = await contactEmailsRepository.save({
        email,
        contact: newContact
    });

    const newContactPhone: ContactPhones = await contactPhonesRepository.save({
        phone,
        contact: newContact
    });

    return returnContactSchema.parse({
        ...newContactEmail,
        ...newContactPhone,
        ...newContact
    })
};

export const readContactsByUserService = async (userId: string) => {
    const userContacts = await userRepository.findOne({
        where: {
            id: userId
        },
        relations:{
            contacts: true
        }
    });

    return readContactsByUserSchema.parse(userContacts);
};


export const retrieveContactService = async (contactId: string) => {
    const contact = await contactRepository.findOne({
        where: {
            id: contactId
        },
        relations: {
            contactEmails: true,
            contactPhones: true
        }
    });

    return retrieveContactSchema.parse(contact);
};