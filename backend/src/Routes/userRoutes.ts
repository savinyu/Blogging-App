import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import {signinSchema, signupSchema} from '@savinyu/medium-common';

const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>();



userRouter.post('/signup',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userData = signupSchema.safeParse(body);
    if(!userData.success){
        return c.json({'mssg':"Invalid User Details"});
    }
    try{
        const user = await prisma.user.create({
            data:{
                username:body.username,
                firstName:body.firstName,
                lastName:body.lastName,
                email:body.email,
                password:body.password
            }
        })
        return c.json({'mssg':'User created successfully'});
    }catch(error){
        console.error(error);
        return c.json({'mssg':'Some error occured'});
    }
});

userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userData = signinSchema.safeParse(body);
    if(!userData.success){
        return c.json({'mssg':'Incorrect Credentials'});
    }
    const user= await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    });
    if(user?.id){
        const token= await sign(
            {id:user.id},
            c.env.JWT_SECRET,
        )
        // localStorage.setItem('token',token);
        return c.json({'token':token});
    }
    else{
        return c.json({'mssg':'No such user found'});
    }
});

export default userRouter;