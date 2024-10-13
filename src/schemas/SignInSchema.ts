import { z } from 'zod'

export const loginSchema = z.object({
    userName: z.string().trim().min(1, {message:"Username is Required"}),
    password: z.string().trim().min(1, {message:"Password is Required"})
   })

  
export type loginUser = z.infer<typeof loginSchema>