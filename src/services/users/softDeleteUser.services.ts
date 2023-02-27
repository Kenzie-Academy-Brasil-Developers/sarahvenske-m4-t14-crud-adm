import format from "pg-format"
import { client } from "../../database"
import { AppError } from "../../error"
import { IUserResult } from "../../interfaces"

const softDeleteUserService = async (id: number): Promise<void> => {

    let queryTemplate: string = format(
        `
            SELECT
                id, name, email, admin, active
            FROM
                users
            WHERE
                id = %s;
        `,
        id
    )
    
    const queryResult: IUserResult = await client.query(queryTemplate)
    
    if(queryResult.rows[0].active === false){
        throw new AppError("User already deactivated", 400)
    }

    queryTemplate = format(
        `
            UPDATE
                users
            SET
                "active" = false
            WHERE
                id = %s
            RETURNING
                *;
        `,
        id
    )

    await client.query(queryTemplate)
   
}

export { softDeleteUserService }