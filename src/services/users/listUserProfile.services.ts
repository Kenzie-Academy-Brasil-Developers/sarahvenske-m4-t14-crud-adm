import format from "pg-format"
import { client } from "../../database"
import { IUserResult, IUserWithoutPassword } from "../../interfaces"

const listUserProfileService = async (id: number): Promise<IUserWithoutPassword> => {
    
    const queryTemplate: string = format(
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
    
    return queryResult.rows[0]
    
}

export { listUserProfileService }