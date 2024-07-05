import { Hono } from 'hono'

const app = new Hono()

async function authMiddleware(c:any,next:any){
  if(c.req.header("Authorization")){
    const initTime = new Date();
    await next();
    const totalTime = (new Date().getDate() - initTime.getDate())/1000
    console.log(`it took ${totalTime} seconds`)
  }else{
    return c.text("You don't have access");
  }
}

//fetch => json
app.post('/',authMiddleware, async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization")); 
  console.log(c.req.query("param")); 
  return c.json({
    message: "hi there"
  })
})

export default app;
