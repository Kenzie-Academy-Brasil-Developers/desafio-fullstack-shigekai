import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Contact } from "./Contact.entity";
import { User } from "./User.entity";


@Entity("user_emails")
export class UserEmails{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 256, unique: true})
    email: string

    @Column({default: false})
    main: boolean

    @UpdateDateColumn({type: "date"})
    updatedAt: string

    @ManyToOne(() => User, (user) => user.userEmails, {onDelete: "CASCADE"})
    @JoinColumn()
    user: User
}