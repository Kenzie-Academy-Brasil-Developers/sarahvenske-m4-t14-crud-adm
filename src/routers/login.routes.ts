import { Router } from "express";
import { userLoginController } from "../controllers"
import { ensureDataIsValidMiddleware } from "../middlewares";
import { userLoginSerializer } from "../serializers";

const loginRouter: Router = Router()

loginRouter.post("", ensureDataIsValidMiddleware(userLoginSerializer), userLoginController)

export default loginRouter