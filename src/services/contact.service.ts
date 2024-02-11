import { Contact } from "../entities/Contact.entity";
import { ContactEmails } from "../entities/ContactEmails.entity";
import { ContactPhones } from "../entities/ContactPhones.entity";
import { User } from "../entities/User.entity";
import { ICreateContact, INewContactEmail, INewContactPhone } from "../interfaces/contact.interface";
import { contactEmailsRepository, contactPhonesRepository, contactRepository, userRepository} from "../repositories";
import { readContactsByUserSchema, retrieveContactSchema, returnContactSchema, returnUpdatedContactSchema } from "../schemas/contact.schema";
import { returnNewContactEmailSchema } from "../schemas/contactEmails.schema";
import { returnNewContactPhoneSchema } from "../schemas/contactPhones.schema";

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

export const updateContactService = async (
    contact: Contact,
    data: any
) => 
{

    const updatedContact = contactRepository.create({
        ...contact, 
        ...data
    });

    await contactRepository.save(updatedContact);

    return returnUpdatedContactSchema.parse(updatedContact);
};


export const deleteContactService = async (contact: Contact) => {
    return await contactRepository.remove(contact);
};

export const newContactEmailService = async (
    data: INewContactEmail,
    contact: Contact
    ) => {

    const newContactEmail = await contactEmailsRepository.save({
        ...data,
        contact: contact
    });

    return returnNewContactEmailSchema.parse(newContactEmail);
};

export const deleteContactEmailService = async (
    contactEmail: ContactEmails
) => {
    await contactEmailsRepository.remove(contactEmail);
};
export const newContactPhoneService = async (
    data: INewContactPhone,
    contact: Contact
    ) => {

    const newContactPhone = await contactPhonesRepository.save({
        ...data,
        contact: contact
    });

    return returnNewContactPhoneSchema.parse(newContactPhone);
};

export const deleteContactPhoneService = async (
    contactPhone: ContactPhones
) => {
    await contactPhonesRepository.remove(contactPhone)
};