import { Request, Response, NextFunction } from "express"
import format from "pg-format"
import { IUserResult } from "../interfaces"
import { client } from "../database"
import { AppError } from "../error"

const ensureUserExistsMiddleware = async   (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const id: number = parseInt(req.params.id)

    const queryTemplate: string = format(
        `
            SELECT
                *
            FROM
                users
            WHERE
                id = %L;
        `,
        id
    )

    const queryResult: IUserResult = await client.query(queryTemplate)

    if(queryResult.rowCount === 0){
       throw new AppError("User not found!", 404)
    }
    
    return next()
}

export { ensureUserExistsMiddleware }