import { Request, Response } from "express"
import { ILoginRequest } from "../interfaces"
import { userLoginService } from "../services"

const userLoginController = async (req: Request, res: Response): Promise<Response> => {
    
    const data: ILoginRequest = req.body

    const token = await userLoginService(data)
    
    return res.status(200).json({
        token: token
    })
}

export {
    userLoginController
}