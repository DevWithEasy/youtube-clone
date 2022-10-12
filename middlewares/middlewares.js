const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
var cookieParser = require('cookie-parser')

const middlewares = [
    morgan("dev"),
    cors(),
    express.json(),
    express.urlencoded({extended:false}),
    cookieParser()
]

const applyMiddleares=(app)=>{
    middlewares.map(m=>app.use(m))
}

module.exports = applyMiddleares