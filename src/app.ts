import "express-async-errors"
import express, { Application } from "express";
import { userRouters, loginRouter } from "./routers"
import { handleErrors } from "./error";

const app: Application = express()
app.use(express.json())

app.use("/users", userRouters)

app.use("/login", loginRouter)

app.use(handleErrors)

export default app


