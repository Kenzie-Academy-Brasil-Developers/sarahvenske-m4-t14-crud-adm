import { QueryResult } from "pg"
import { z } from "zod"
import { 
    allUsersSerializer,
    createUserSerializer, 
    returnUserSerializer, 
    updateUserSerializer, 
    userSerializer 
} from "../serializers"

type IUserRequest = z.infer< typeof createUserSerializer>

type IAllUsers = z.infer<typeof allUsersSerializer>

type IUser = z.infer< typeof userSerializer>

type IUserWithoutPassword = z.infer< typeof returnUserSerializer>

type IUserResult = QueryResult<IUserWithoutPassword>

type IUserUpdateRequest = z.infer< typeof updateUserSerializer>

export {
    IUserRequest,
    IAllUsers,
    IUser,
    IUserWithoutPassword,
    IUserResult,
    IUserUpdateRequest
}
