import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./Contact.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string 

    @Column({length: 120})
    name: string

    @Column({array: true, length: 120, unique: true})
    email: string[]

    @Column({length: 256})
    password: string

    @Column({array: true, length: 16})
    phone: string[]

    @CreateDateColumn({type: "date"})
    createdAt: string

    @OneToMany(() => Contact, (contact) => contact.user)
    @JoinColumn()
    contacts: Contact[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const hash: number = getRounds(this.password);

        if(!hash){
            this.password = hashSync(this.password, 10);
        }
    };
};