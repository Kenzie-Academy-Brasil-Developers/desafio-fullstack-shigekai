import { Repository } from "typeorm";
import { User } from "./entities/User.entity";
import { AppDataSource } from "./data-source";
import { UserEmails } from "./entities/UserEmails.entity";
import { UserPhones } from "./entities/UserPhones.entity";
import { Contact } from "./entities/Contact.entity";
import { ContactEmails } from "./entities/ContactEmails.entity";
import { ContactPhones } from "./entities/ContactPhones.entity";

export const userRepository: Repository<User> =
AppDataSource.getRepository(User);

export const userEmailsRepository: Repository<UserEmails> =
AppDataSource.getRepository(UserEmails);

export const userPhonesRepository: Repository<UserPhones> =
AppDataSource.getRepository(UserPhones);


export const contactRepository: Repository<Contact> =
AppDataSource.getRepository(Contact);

export const contactEmailsRepository: Repository<ContactEmails> =
AppDataSource.getRepository(ContactEmails);

export const contactPhonesRepository: Repository<ContactPhones> =
AppDataSource.getRepository(ContactPhones);