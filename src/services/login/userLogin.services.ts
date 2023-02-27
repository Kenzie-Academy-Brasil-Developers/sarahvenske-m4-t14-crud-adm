import { compare } from "bcryptjs"
import format from "pg-format"
import { client } from "../../database"
import { AppError } from "../../error"
import { ILoginRequest, LoginResult } from "../../interfaces"
import jwt from "jsonwebtoken"
import "dotenv/config"

const userLoginService = async (data: ILoginRequest): Promise<string> => {
  
    const queryTemplate: string = format(
        `
            SELECT 
                *
            FROM
                users
            WHERE
                email = %L;
        `,
        data.email
    ) 

    const queryResult: LoginResult = await client.query(queryTemplate)

    if(queryResult.rowCount === 0){
        throw new AppError("Wrong email or password!", 401)
    }

    const comparePassword: boolean = await compare(data.password, queryResult.rows[0].password) 

    if(!comparePassword){
        throw new AppError("Wrong email or password!", 401)
    }

    if(!queryResult.rows[0].active){
        throw new AppError("Wrong email or password!", 401)
    }
    
    const token: string = jwt.sign(
        {
            admin: queryResult.rows[0].admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: queryResult.rows[0].id.toString()
        }
    ) 

    return token
}

export { 
    userLoginService
}

