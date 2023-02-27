import { Router } from "express";
import {
    createUserController,
    listUsersController,
    listUserProfileController,
    updateUserController,
    softDeleteUserController,
    reactivateUserController
} from "../controllers"

import {
    ensureDataIsValidMiddleware,
    verifyEmailAvailabilityMiddleware,
    ensureUserExistsMiddleware,
    ensureUserIsAuthMiddleware,
    ensureUserIsAdminMiddleware
} from "../middlewares"

import { 
    createUserSerializer, 
    updateUserSerializer 
} from "../serializers";

const userRouters: Router = Router()

userRouters.post("", ensureDataIsValidMiddleware(createUserSerializer), verifyEmailAvailabilityMiddleware, createUserController)
userRouters.get("", ensureUserIsAuthMiddleware, ensureUserIsAdminMiddleware, listUsersController)
userRouters.get("/profile", ensureUserIsAuthMiddleware, listUserProfileController)
userRouters.patch("/:id", ensureUserIsAuthMiddleware, ensureUserIsAdminMiddleware, ensureUserExistsMiddleware, ensureDataIsValidMiddleware(updateUserSerializer), verifyEmailAvailabilityMiddleware, updateUserController)
userRouters.delete("/:id", ensureUserIsAuthMiddleware, ensureUserIsAdminMiddleware, ensureUserExistsMiddleware, softDeleteUserController)
userRouters.put("/:id/recover", ensureUserIsAuthMiddleware, ensureUserIsAdminMiddleware, ensureUserExistsMiddleware, reactivateUserController)

export default userRouters