import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./Contact.entity";
import { getRounds, hashSync } from "bcryptjs";
import { UserEmails } from "./UserEmails.entity";
import { UserPhones } from "./UserPhones.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string 

    @Column({length: 120})
    name: string

    @Column({length: 256})
    password: string

    @Column({default: false})
    admin: boolean

    @CreateDateColumn({type: "date"})
    createdAt: string

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[]

    @OneToMany(() => UserEmails, (userEmails) => userEmails.user)
    userEmails: UserEmails[]

    @OneToMany(() => UserPhones, (userPhones) => userPhones.user)
    userPhones: UserPhones[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const hash: number = getRounds(this.password);

        if(!hash){
            this.password = hashSync(this.password, 10);
        }
    };
};