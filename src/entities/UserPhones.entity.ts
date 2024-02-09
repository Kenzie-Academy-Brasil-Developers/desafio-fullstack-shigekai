import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Contact } from "./Contact.entity";
import { User } from "./User.entity";


@Entity("user_phones")
export class UserPhones{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 16, unique: true})
    phone: string

    @UpdateDateColumn({type: "date"})
    updatedAt: string

    @ManyToOne(() => User, (user) => user.userPhones, {onDelete: "CASCADE"})
    @JoinColumn()
    user: User
}