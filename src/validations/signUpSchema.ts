// import zod 
import { z  } from "zod"

// zod validation schema 
const signUpSchema = z .object({
    firstName: z .string().min(1, { message: "First name is required" }),
    lastName: z .string().min(1, { message: "Last name is required" }),
    email: z .string().min(1).email({ message: "Email is required" }).email(),
    password: z 
      .string()
      .min(8, { message: "Password is required" })
      .regex(/(?=.*[a-z])/, { message: "Password must contain at least one lowercase letter" }),
    confirmPassword: z .string().min(1, { message: "Confirm Password is required" }), 
  }).refine((input) => input.password === input.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
    
  // type of form inputs 
  type signUpType = z.infer<typeof signUpSchema>

  export { signUpSchema, type signUpType }