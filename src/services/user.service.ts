import "dotenv/config"
import { compare } from "bcryptjs";
import { User } from "../entities/User.entity";
import { AppError } from "../errors/AppError.error";
import { ICreateUser, ILoginUser, INewUserEmail, INewUserPhone, IReadAllUsers, IUpdateUser } from "../interfaces/user.interface";
import { userEmailsRepository, userPhonesRepository, userRepository } from "../repositories";
import { readAllUsersSchema, retrieveUserSchema, safeReturnUpdateUserSchema, safeReturnUserSchema } from "../schemas/user.schema";
import { sign } from "jsonwebtoken";
import { UserEmails } from "../entities/UserEmails.entity";
import { returnNewUserEmailSchema } from "../schemas/userEmails.schema";
import { returnNewUserPhoneSchema } from "../schemas/userPhones.schema";
import { UserPhones } from "../entities/UserPhones.entity";

export const createUserService = async (data: ICreateUser) => {
    const {email, phone, ...user} = data;

    const newUser = userRepository.create(user);
    await userRepository.save(newUser);
    const newUserEmail = await userEmailsRepository.save({
        email,
        main: true,
        user: newUser
    });

    const newUserPhone = await userPhonesRepository.save({
        phone,
        user: newUser
    });

    return safeReturnUserSchema.parse({
        ...newUserEmail,
        ...newUserPhone,
        ...newUser
    });
};

export const loginUserService = async (data: ILoginUser) => {

    const userEmail = await userEmailsRepository.findOne({
        where: {
            email: data.email
        },
        relations: {
            user: true
        }
    });

    if(!userEmail) throw new AppError("Invalid email or password", 400);

    const {user} = userEmail;

    const validPassword: boolean = await compare(
        data.password,
        user.password
    );

    if(!validPassword) throw new AppError("Invalid email or password", 400);

    const token: string = sign(
        {email: userEmail.email, admin: user.admin},
        String(process.env.SECRET_KEY),
        {expiresIn: "24h", subject: String(user.id)}
    );
    
    const userReturn = safeReturnUpdateUserSchema.parse(user);

    return {token, user: userReturn};
};

export const readAllUsersService = async (): Promise<IReadAllUsers> => {
    const users: User[] = await userRepository.find();

    return readAllUsersSchema.parse(users);
}; 

export const retrieveUserService = async (
    userId: string
) => {

    const user = await userRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            userEmails: true,
            userPhones: true
        }
    });

    return retrieveUserSchema.parse(user);
};


export const updateUserService = async (
    data: object,
    user: User,
    ) => {

    const updatedUser = userRepository.create({
        ...user,
        ...data
    })

    await userRepository.save(updatedUser);


    return safeReturnUpdateUserSchema.parse(updatedUser);
};

export const deleteUserService = async (user: User) => {
    return await userRepository.remove(user);
};

export const newUserEmailService = async (
    data: INewUserEmail,
    user: User
    ) => {

    const newUserEmail = await userEmailsRepository.save({
        ...data,
        user: user
    });

    return returnNewUserEmailSchema.parse(newUserEmail);
};

export const deleteUserEmailService = async (
    userEmail: UserEmails
) => {

    if(userEmail.main) throw new AppError(
        "Cannot delete main email",
        401
    );

    await userEmailsRepository.remove(userEmail);
};

export const newUserPhoneService = async (
    data: INewUserPhone,
    user: User
    ) => {

    const newUserPhone = await userPhonesRepository.save({
        ...data,
        user: user
    });

    return returnNewUserPhoneSchema.parse(newUserPhone);
};

export const deleteUserPhoneService = async (
    userPhone: UserPhones
) => {
    await userPhonesRepository.remove(userPhone)
};