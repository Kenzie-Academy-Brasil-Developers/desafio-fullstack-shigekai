import { Request, Response } from "express";
import { IReadAllUsers, ISafeReturnUser } from "../interfaces/user.interface";
import { createUserService, deleteUserEmailService, deleteUserPhoneService, deleteUserService, loginUserService, newUserEmailService, newUserPhoneService, readAllUsersService, retrieveUserService, updateUserService } from "../services/user.service";
import { User } from "../entities/User.entity";

export const createUserController = async (
    req: Request,
    res: Response
) => {
    const user: ISafeReturnUser = await createUserService(req.body);

    return res.status(201).json(user);
};

export const loginUserController = async (
    req: Request,
    res: Response
) => {
    const token = await loginUserService(req.body);

    return res.status(200).json(token);
};

export const readAllUsersController = async (
    req: Request,
    res: Response
) => {
    const users: IReadAllUsers = await readAllUsersService();

    return res.status(200).json(users);
};


export const retrieveUserController = async (
    req: Request,
    res: Response
    ) => {
        const user = await retrieveUserService(req.params.userId);
        
        return res.status(200).json(user);
};

export const updateUserController = async (
    req: Request,
    res: Response
) => {

    const updatedUser = await updateUserService(req.body, res.locals.entity);

    return res.status(200).json(updatedUser);
};

export const deleteUserController = async (
    req: Request,
    res: Response
) => {

    await deleteUserService(res.locals.entity);

    return res.status(204).json();
};

export const newUserEmailController = async (
    req: Request,
    res: Response
) => {

    const newUserEmail = await newUserEmailService(
        req.body,
        res.locals.entity
    );

    return res.status(201).json(newUserEmail)
};

export const deleteUserEmailController = async (
    req: Request,
    res: Response
) => {
    await deleteUserEmailService(res.locals.entity);

    return res.status(204).json();
};

export const newUserPhoneController = async (
    req: Request,
    res: Response
) => {

    const newUserPhone = await newUserPhoneService(
        req.body,
        res.locals.entity
    );

    return res.status(201).json(newUserPhone)
};

export const deleteUserPhoneController = async (
    req: Request,
    res: Response
) => {
    await deleteUserPhoneService(res.locals.entity);

    return res.status(204).json();
};