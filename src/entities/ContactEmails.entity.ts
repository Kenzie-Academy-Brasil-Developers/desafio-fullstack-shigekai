import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Contact } from "./Contact.entity";


@Entity("contact_emails")
export class ContactEmails{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 256})
    email: string

    @UpdateDateColumn({type: "date"})
    updatedAt: string

    @ManyToOne(() => Contact, (contact) => contact.contactEmails, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    contact: Contact
}