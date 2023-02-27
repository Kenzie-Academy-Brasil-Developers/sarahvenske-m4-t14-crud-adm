import { z } from 'zod'

const userLoginSerializer = z.object({
    email: z
    .string()
    .email(),
    password: z
    .string()
})

export {
    userLoginSerializer
}