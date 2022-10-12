require("dotenv").config()
const express = require("express")
const errorHandler = require("./middlewares/errorHandler")
const applyMiddleares = require("./middlewares/middlewares")
const applyRoutes = require("./routes/routes")
const dbConnection = require("./utils/dbConnection")
const app = express()



//middleware
applyMiddleares(app)

//routes
applyRoutes(app)

//database connection
dbConnection()

//errorHandler
errorHandler(app)


const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log('server is running http://localhost:8080')
})