import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogSchema, updateBlogSchema } from "@savinyu/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogRouter = new Hono<{
    Bindings:{
        JWT_SECRET:string,
        DATABASE_URL:string
    },
    Variables:{
        userId:string
    }
}>();

blogRouter.use('/*',async(c,next)=>{
    const token = c.req.header("authorization")||"";
    const secret = c.env.JWT_SECRET;
    try{
        const payload = await verify(token,secret);
        if(payload?.id){
            c.set("userId",String(payload.id));
            await next();
        }
    }catch{
        return c.json({'mssg':'Not authorized'})
    }
});

blogRouter.post('',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blog = await c.req.json();
    const {success} = createBlogSchema.safeParse(blog);
    if(!success){
        return c.json({message:'Invalid inputs'});
    }
    const userId = c.get('userId');
    try{
        const post = await prisma.post.create({
            data:{
                title:blog.title,
                content:blog.content,
                published:true,
                authorId:userId
            }
        });
        return c.json({id:post.id});
    }catch{
        return c.json({
            message:'Some error occured'
        })
    }
});

blogRouter.put('',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const updateblog = await c.req.json();
    const {success} = updateBlogSchema.safeParse(updateblog);
    if(!success){
        return c.json({message:'Invalid inputs'});
    }
    const userId = c.get('userId');
    try{
        const post = await prisma.post.update({
            where:{
                id:updateblog.id,
                authorId:userId
            },
            data:{
                title:updateblog.title,
                content:updateblog.content,
            }
        });
        return c.text('Post updated');
    }catch{
        return c.json({
            message:'Some error occured'
        })
    }
});

blogRouter.get('/getbyid/:id',async (c)=>{
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const blog = await prisma.post.findUnique({
            where:{
                id
            }
        });
        return c.json(blog);
    }catch{
        return c.json({'mssg':'Post does not exist'});
    }
});

blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const posts = await prisma.post.findMany();
    return c.json(posts);
})

export default blogRouter;