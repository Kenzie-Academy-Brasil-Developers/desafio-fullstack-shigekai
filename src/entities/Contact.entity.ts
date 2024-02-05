import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("contacts")
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string 

    @Column({length: 120})
    name: string

    @Column({array: true, length: 120})
    email: string[]

    @Column({array: true, length: 16})
    phone: string[]

    @CreateDateColumn({type: "date"})
    createdAt: string

    @UpdateDateColumn({type: "date"})
    updatedAt: string

    @ManyToOne(()=> User, (user) => user.contacts)
    user: User
};