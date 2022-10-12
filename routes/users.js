const {update,deleteUser,getUser,subscribe,unsubscribe,like,dislike} = require("../controllers/user")
const verifyToken = require("../utils/verifyToken")

const router = require("express").Router()

//UPDATE USER
router.put("/:id",verifyToken,update)

//DELETE USER
router.delete("/:id",verifyToken,deleteUser)

//GET A USER
router.get("/:id",getUser)

//SUBSCRIBE A USER
router.put("/subscribe/:id",verifyToken,subscribe)

//UNSUBSCRIBE A USER
router.put("/unsubscribe/:id",verifyToken,unsubscribe)

//LIKE A VIDEO
router.put("/like/:videoId",verifyToken,like)

//DISLIKE A VIDEO
router.put("/dislike/:videoId",verifyToken,dislike)

module.exports = router