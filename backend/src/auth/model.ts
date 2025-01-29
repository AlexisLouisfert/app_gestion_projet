import { z } from "zod";

export const permissionSchema = z.object({
  actions: z.array(z.string()),
  resources: z.array(z.string())
})

export type Permission = z.infer<typeof permissionSchema>

export const signupDataSchema = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string()
})  

export type SignupData = z.infer<typeof signupDataSchema>

export const loginDataSchema = z.object({ 
  email: z.string(), 
  password: z.string() 
}) 
export type LoginData = z.infer<typeof loginDataSchema>

export const roleSchema = z.object({
  name: z.string(),
  permissions: z.array(permissionSchema)
})
export type Role = z.infer<typeof roleSchema>

export const userDataSchema = z.object({
  name: z.string(),
  email: z.string(),
  roles: z.array(roleSchema)
})  
export type UserData = z.infer<typeof userDataSchema>


export const userDetailsSchema = z.object({ 
  name: z.string(), 
  email: z.string(), 
  password: z.string() 
})

export type UserDetails = z.infer<typeof userDetailsSchema>



export const tokenDataSchema = z.object({
 // type: z.enum(["access", "refresh"]),
  user: userDataSchema,
  fingerprint: z.string()
})

export type TokenData = z.infer<typeof tokenDataSchema>



export const refreshTokenDataSchema = z.object({
  token: z.string()
})
export type RefreshTokenData = z.infer<typeof refreshTokenDataSchema>

export const userSchema = z.lazy(() => z.object({  
  name: z.string(),
  email: z.string(),
  roles: z.array(roleSchema),
  password: z.string(),
  projects: z.array(z.object({
    project: z.string(),
    roles: z.array(z.string()),
  }))
}))
export type User = z.infer<typeof userSchema>    

export const blacklistSchema = z.object({
  accessTokens: z.array(z.string()),
  refreshTokens: z.array(z.string())
}) 
export type Blacklist = z.infer<typeof blacklistSchema>