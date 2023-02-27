import { Request, Response, NextFunction } from "express"
import format from "pg-format"
import { IUserResult } from "../interfaces"
import { client } from "../database"
import { AppError } from "../error"

const verifyEmailAvailabilityMiddleware = async   (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const email: string = req.body.email

    const queryTemplate: string = format(
        `
            SELECT
                *
            FROM
                users
            WHERE
                email = %L;
        `,
        email
    )

    const queryResult: IUserResult = await client.query(queryTemplate)
    
    if(queryResult.rowCount > 0){
        throw new AppError("E-mail already registered!", 409)
    }
    
    return next()
}

export { verifyEmailAvailabilityMiddleware }