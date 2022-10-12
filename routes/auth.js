const { signup, signin, google } = require("../controllers/auth")

const router = require("express").Router()

//CREATE A USER
router.post('/signup',signup)


//SIGN IN USER
router.post('/signin',signin)


//GOOGLE AUTH
router.post('/google',google)

module.exports = router