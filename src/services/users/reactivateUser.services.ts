import format from "pg-format"
import { client } from "../../database"
import { AppError } from "../../error"
import { IUserResult } from "../../interfaces"

const reactivateUsersService = async (id: number): Promise<void> => {
    
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
    
    if(queryResult.rows[0].active === true){
        throw new AppError("User already active", 400)
    }

     queryTemplate = format(
        `
            UPDATE
                users
            SET
                "active" = true
            WHERE
                id = %s
            RETURNING
                *;
        `,
        id
    )

    await client.query(queryTemplate)

}

export { reactivateUsersService }