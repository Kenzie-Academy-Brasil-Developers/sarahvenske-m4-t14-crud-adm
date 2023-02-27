import { client } from "../../database"
import { IUserResult, IAllUsers } from "../../interfaces"

const listUsersService = async (): Promise<IAllUsers>=> {
    
    const queryString: string = `
            SELECT
                id, name, email, admin, active
            FROM
                users;
        `

    const queryResult: IUserResult = await client.query(queryString)
    
    return queryResult.rows

}
export { listUsersService }