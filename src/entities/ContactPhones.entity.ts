import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Contact } from "./Contact.entity";


@Entity("contact_phones")
export class ContactPhones{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 16})
    phone: string

    @UpdateDateColumn({type: "date"})
    updatedAt: string

    @ManyToOne(() => Contact, (contact) => contact.contactPhones, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    contact: Contact
}