import { IUserRequest, IUserResult, IUserWithoutPassword } from "../../interfaces"
import { client } from "../../database"
import format from "pg-format"
import { returnUserSerializer } from "../../serializers"

const createUserService = async (data: IUserRequest): Promise<IUserWithoutPassword>=> {
        
    const queryTemplate: string = format(
        `
            INSERT INTO
                users(%I)
            VALUES
                (%L)
            RETURNING
                id, name, email, admin, active
        `,
        Object.keys(data),
        Object.values(data)
    )
    
    const queryResult: IUserResult = await client.query(queryTemplate)

    const newUser = returnUserSerializer.parse(queryResult.rows[0])
    
    return newUser
    
}

export {
    createUserService
}