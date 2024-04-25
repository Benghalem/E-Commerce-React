// import zod 
import { z  } from "zod"

// zod validation schema 
const signInSchema = z .object({
    email: z .string().min(1).email({ message: "Email is required" }).email(),
    password: z 
        .string()
        .min(8, { message: "Password is required" })
})
    
  // type of form inputs 
type signInType = z.infer<typeof signInSchema>

export { signInSchema, type signInType }