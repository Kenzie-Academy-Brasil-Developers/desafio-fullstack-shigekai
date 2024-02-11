import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { ContactEmails } from "./ContactEmails.entity";
import { ContactPhones } from "./ContactPhones.entity";

@Entity("contacts")
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string 

    @Column({length: 120})
    name: string

    @Column({type: "text"})
    description: string

    @CreateDateColumn({type: "date"})
    createdAt: string

    @UpdateDateColumn({type: "date"})
    updatedAt: string

    @ManyToOne(()=> User, (user) => user.contacts, {onDelete: "CASCADE"})
    @JoinColumn()
    user: User

    @OneToMany(() => ContactEmails, (contactEmails) => contactEmails.contact)
    contactEmails: ContactEmails[]

    @OneToMany(() => ContactPhones, (contactPhones) => contactPhones.contact)
    contactPhones: ContactPhones[]
};