const Video = require("../models/Video")
const User = require("../models/User")
const createError = require("../utils/error")

exports.addVideo=async(req,res,next)=>{
    const newVideo = new Video({
        userId: req.user.id,
        ...req.body
    })
    try{
        const uploadVideo = await newVideo.save()
        res.status(200).json({
            status:"success",
            msg:"Video uploaded successfully",
            video:uploadVideo
        })
    }catch(err){
        next(err)
    }
}

exports.updateVideo=async(req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404,"Video not found"))
        if(req.user.id === video.userId){
            const updateVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json({
                status:"success",
                msg:"Video updated successfully",
                video:updateVideo
            })
        }else{
            return next(createError(403,"You can Only update your video"))
        }
    }catch(err){
        next(err)
    }
}

exports.deleteVideo=async(req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404,"Video not found"))
        if(req.user.id === video.userId){
             await Video.findByIdAndDelete(req.params.id)
            res.status(200).json({
                status:"success",
                msg:"Video deleted successfully"
            })
        }else{
            return next(createError(403,"You can Only delete your video"))
        }
    }catch(err){
        next(err)
    }
}

exports.getVideo=async(req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404,"Video not found"))
        res.status(200).json({
            status:"success",
            msg:"Video found successfully",
            video
        })
    }catch(err){
        next(err)
    }
}

exports.addView=async(req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json({
            status:"success",
            msg:"Video view has been increased"
        })
    }catch(err){
        next(err)
    }
}

exports.getTrend=async(req,res,next)=>{
    try{
        const videos = await Video.find().sort({views:-1})
        res.status(200).json({
            status:"success",
            videos
        })
    }catch(err){
        next(err)
    }
}

exports.getRandom=async(req,res,next)=>{
    try{
        const videos = await Video.aggregate([{$sample:{size:40}}])
        res.status(200).json({
            status:"success",
            videos
        })
    }catch(err){
        next(err)
    }
}

exports.getSubscribe=async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers

        const videos = await Promise.all(
            subscribedChannels.map(channelId=>{
                return Video.find({userId:channelId})
            })
        )
        res.status(200).json({
            status:"success",
            videos:videos.flat().sort((a,b)=>b.createdAt - a.createdAt)
        })
    }catch(err){
        next(err)
    }
}

exports.getTag=async(req,res,next)=>{
    try{
        const tags = req.query.tags.split(",")
        const videos = await Video.find({tags:{$in:tags}}).limit(20)
        res.status(200).json({
            status:"success",
            videos
        })
        console.log(tags)
    }catch(err){
        next(err)
    }
}

exports.getSearch=async(req,res,next)=>{
    const query = req.query.q
    try{
        const videos = await Video.find({title:{$regex: query, $options: "i"}}).limit(40)
        res.status(200).json({
            status:"success",
            videos
        })
    }catch(err){
        next(err)
    }
}