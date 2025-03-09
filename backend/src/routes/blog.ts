import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@namankundra/blogging-app";


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	},
    Variables:{
        userId: string
    }
}>()

blogRouter.use("/*", async (c,next)=>{
  
    let token = c.req.header("Authorization") || "";
    token = token.split(" ")[1];
  
    try {
        const user = await verify(token,c.env.JWT_SECRET);
    if(user){
        c.set("userId", user.id);
        return next()
    }
    else{
      c.status(403);
      return c.json({ error: "token not valid" });
    }
    } catch (error) {
        c.status(403);
        return c.json({ error: "token not valid" });
    }
  
})
  
  
  blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		},
    select:{
      content:true,
      title:true,
      author:{
        select:{
          name:true
        }
      },
      id:true,
      date:true
    }

	});

	return c.json(post);
  })
  
  
  blogRouter.get('/get/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blogs = await prisma.post.findMany({
        select:{
          content:true,
          title:true,
          author:{
            select:{
              name:true
            }
          },
          id:true,
          date:true
        }
      })
      
      return c.json(blogs)
  })

  blogRouter.get('/get/myblogs', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const authorId = c.get("userId");

      const blogs = await prisma.post.findMany({
        where:{
          authorId
        },
        select:{
          content:true,
          title:true,
          author:{
            select:{
              name:true
            }
          },
          id:true,
          date:true
        }
      })
      
      return c.json(blogs)
  })

  blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const body = await c.req.json();
      const {success } = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({message:"Invalid input"})
    }

      const authorId = c.get("userId");

      const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId 

        }
      })

      return c.json({
        id: blog.id
      })
  })
  
  blogRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const body = await c.req.json();
      const {success } = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({message:"Invalid input"})
    }

      const userId = c.get("userId");
       
      try {
        const blog = await prisma.post.update({
            where:{
                id: body.id,
                authorId : userId
            },
            data:{
                title: body.title,
                content: body.content,
            }
          })

          return c.json({message:"Updated post"})
      } catch (error) {
        console.log(error);
        c.status(411);
        return c.json({message:"Error while updating blog post"})
      }

  })
  
  