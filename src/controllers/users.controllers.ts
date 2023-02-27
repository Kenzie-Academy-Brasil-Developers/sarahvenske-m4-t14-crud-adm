import { Request, Response } from "express";
import { 
    createUserService,
    listUserProfileService,
    listUsersService,
    reactivateUsersService,
    softDeleteUserService,
    updateUserService,
} from "../services"

import { IUserRequest } from "../interfaces"
import { IUserUpdateRequest } from "../interfaces/users.interfaces";

const createUserController = async (req: Request, res: Response): Promise<Response> => {
    
    const data: IUserRequest = req.body

    const newUser = await createUserService(data)

    return res.status(201).json(newUser)

}

const listUsersController = async (req: Request, res: Response): Promise<Response> => {
    
    const users = await listUsersService()
   
    return res.status(200).json(users)

}

const listUserProfileController = async (req: Request, res: Response): Promise<Response> => {

    const id: number = req.user.id 

    const userProfile = await listUserProfileService(id)
    
    return res.status(200).json(userProfile)

}

const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    
    const id: number = parseInt(req.params.id)
    
    const data: IUserUpdateRequest = req.body

    const updatedUser = await updateUserService(id, data)
    
    return res.status(200).json(updatedUser)

}

const softDeleteUserController = async (req: Request, res: Response): Promise<Response> => {

    const id: number = parseInt(req.params.id)

    await softDeleteUserService(id)

    return res.status(204).send()

}

const reactivateUserController = async (req: Request, res: Response): Promise<Response> => {
    
    const id: number = parseInt(req.params.id)

    await reactivateUsersService(id)

    return res.status(200).send()
    
}

export {
    createUserController,
    listUsersController,
    listUserProfileController,
    updateUserController,
    softDeleteUserController,
    reactivateUserController
}