import { QueryResult } from "pg"
import { z } from "zod"
import { userLoginSerializer } from "../serializers"
import { IUser } from "./users.interfaces"

type ILoginRequest = z.infer<typeof userLoginSerializer>

type LoginResult = QueryResult<IUser>

export {
    ILoginRequest,
    LoginResult
}