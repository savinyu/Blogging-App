import z from 'zod';

export const signupSchema = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email:z.string().email(),
    password:z.string().min(6,{message:"Password too short"})
})

export const signinSchema = z.object({
    email:z.string(),
    password:z.string().min(6,"Password too short")
})

export const createBlogSchema = z.object({
    title:z.string(),
    content:z.string()
})

export const updateBlogSchema = z.object({
    title:z.string(),
    content:z.string(),
    id:z.number()
    
});
export type SignupSchema = z.infer<typeof signupSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;