import { z } from 'zod'

export const formSchema = z.object({
    userName: z.string().trim().min(6, {message:'Username should be contains at least 6 character'}),
    email: z.string().trim().email('Email is Invalid'),
    password: z.string().trim().min(7, {message:'Password should be contains at least 7 (letter, symbol, number'}).regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,16}$/,{message: 'Password shound be contains at least one Capital and Small Charatcer and One Digit and Special Symbol'}),
  })
  
export type User = z.infer<typeof formSchema>