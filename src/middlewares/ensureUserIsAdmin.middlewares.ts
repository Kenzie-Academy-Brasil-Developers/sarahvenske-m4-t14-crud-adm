import { Request, Response, NextFunction } from "express"
import { AppError } from "../error"

const ensureUserIsAdminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const user = req.user
    
    const paramsId = parseInt(req.params.id)

    if(!user.admin && user.id !== paramsId){
        throw new AppError("Insufficient Permission", 403)
    }
    
    return next()

}

export {
    ensureUserIsAdminMiddleware
}

