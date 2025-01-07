import {z} from "zod"

export const SignupSchema = z.object({
    email:z.string().email(),
    password:z.string().min(8),
    username:z.string().min(1),
})