import { hashSync } from "bcryptjs"
import { z } from "zod"

const createUserSerializer = z.object({
    
    name: z
    .string({ 
        required_error: "Name is required", 
        invalid_type_error: "Name must be a string",
    })
    .max(20, { message: "Must be 20 or less characters long"}),
    
    email: z
    .string({
        required_error: "Email is required", 
        invalid_type_error: "Email must be a string",
    })
    .email()
    .max(100, { message: "Must be 100 or less characters long"}),
    
    password: z
    .string({
        required_error: "Password is required", 
        invalid_type_error: "Password must be a string"
    })
    .max(120, { message: "Must be 120 or less characters long"})
    .transform((pass) => {
        return hashSync(pass, 10)
    } ),
    
    admin: z
    .boolean()
    .default(false).optional()
})

const userSerializer = createUserSerializer.extend({
    id: z.number(),
    active: z.boolean()
})

const returnUserSerializer = userSerializer.omit({
    password: true
})

const allUsersSerializer = z.array(returnUserSerializer)    

const updateUserSerializer = z.object({
    
    name: z
    .string({ 
        invalid_type_error: "Name must be a string",
    })
    .max(20, { message: "Must be 20 or less characters long"})
    .optional(),
    
    email: z
    .string({
        invalid_type_error: "Email must be a string",
    })
    .email()
    .max(100, { message: "Must be 100 or less characters long"})
    .optional(),
    
    password: z
    .string({
        required_error: "Password is required", 
        invalid_type_error: "Password must be a string"
    })
    .max(120, { message: "Must be 120 or less characters long"})
    .transform((pass) => {
        return hashSync(pass, 10)
    })
    .optional(),
    
})

export {
    createUserSerializer,
    userSerializer,
    returnUserSerializer,
    allUsersSerializer,
    updateUserSerializer
}