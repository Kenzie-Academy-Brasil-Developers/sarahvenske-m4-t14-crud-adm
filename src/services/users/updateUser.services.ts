import format from "pg-format"
import { client } from "../../database"
import { IUserResult, IUserUpdateRequest, IUserWithoutPassword } from "../../interfaces/users.interfaces"

const updateUserService = async (id: number, data: IUserUpdateRequest): Promise<IUserWithoutPassword> => {
    
    const queryTemplate: string = format(
        `
            UPDATE
                users
            SET (%I) = ROW (%L)  
            WHERE
                "id" = %s
            RETURNING
                id, name, email, admin, active;     
        `,
        Object.keys(data),
        Object.values(data),
        id
        )
    
        const queryResult: IUserResult = await client.query(queryTemplate)
    
        return queryResult.rows[0]
        
}

export { updateUserService }