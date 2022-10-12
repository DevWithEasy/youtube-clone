const authRouter = require("../routes/auth")
const userRouter = require("../routes/users")
const videoRouter = require("../routes/videos")
const commentRouter = require("../routes/comments")
const routes = [
    {
        path: "/api/auth",
        handler: authRouter
    },
    {
        path: "/api/user",
        handler: userRouter
    },
    {
        path: "/api/video",
        handler: videoRouter
    },
    {
        path: "/api/comment",
        handler: commentRouter
    },
    {
        path: "/",
        handler: (req,res)=>{
            res.send('Wellcome to youtube')
        }
    }
]

const applyRoutes = (app)=>{
    routes.map(r=>{
        if(r.path === "/"){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}

module.exports = applyRoutes