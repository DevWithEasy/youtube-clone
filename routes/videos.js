const { addVideo, updateVideo, deleteVideo, getVideo, addView, getTrend, getRandom, getSubscribe,getTag,getSearch } = require("../controllers/video")
const verifyToken = require("../utils/verifyToken")

const router = require("express").Router()

router.post("/",verifyToken,addVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.get("/find/:id",getVideo)
router.put("/view/:id",addView)
router.get("/trend",getTrend)
router.get("/random",getRandom)
router.get("/subscribe",verifyToken,getSubscribe)
router.get("/tags",getTag)
router.get("/search",getSearch)
module.exports = router