const User = require("../models/User");
const Video = require("../models/Video");
const createError = require("../utils/error");

exports.update=async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            res.status(200).json(updateUser)
        }catch(err){
            next(err)
        }
    }else{
        return next(createError(403,"You can only update your account"));
    }
}

exports.deleteUser=async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status:"success",
                msg:"User account has been deleted successfully"
            })
        }catch(err){
            next(err)
        }
    }else{
        return next(createError(403,"You can only delete your account"));
    }
}

exports.getUser=async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.status(200).json({
            status:"success",
            msg:"User found successfully",
            user:others
        })
    }catch(err){
        next(err)
    }
}

exports.subscribe=async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers : req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers : 1}
        })
        res.status(200).json({
            status:"success",
            msg:"Subscription successfully",
        })
    }catch(err){
        next(err)
    }
}
exports.unsubscribe=async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers : req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers : -1}
        })
        res.status(200).json({
            status:"success",
            msg:"Unsubscription successfully",
        })
    }catch(err){
        next(err)
    }
}
exports.like=async(req,res,next)=>{
    const id = req.user.id
    const videoId = req.params.videoId
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        res.status(200).json({
            status:"success",
            msg:"Like add successfully",
        })
    }catch(err){
        next(err)
    }
}

exports.dislike=async(req,res,next)=>{
    const id = req.user.id
    const videoId = req.params.videoId
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json({
            status:"success",
            msg:"Dislike add successfully",
        })
    }catch(err){
        next(err)
    }
}