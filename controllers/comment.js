const Comment = require("../models/Comment");
const Video = require("../models/Video");
const createError = require("../utils/error");

exports.addComment=async(req,res,next)=>{
    try{
        const newComment = new Comment({
            ...req.body,
            userId:req.user.id
        })
        const comment = await newComment.save()
        res.status(200).json({
            status:"success",
            msg:"Comment add successfully",
            comment
        })
    }catch(err){
        next(err)
    }
}

exports.deleteComment=async(req,res,next)=>{
    try{
        const comment = Comment.findById(req.params.id)
        if(req.user.id === comment.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json({
                status:"success",
                msg:"Comment deleted successfully",
            })
        }else{
            return next(createError(403,"You can delete only your comment"))
        }
    }catch(err){
        next(err)
    }
}

exports.getComments=async(req,res,next)=>{
    try{
        const comments = await Comment.find({videoId:req.params.videoId})
        res.status(200).json({
            status:"success",
            msg:"Comments found successfully",
            comments
        })
    }catch(err){
        next(err)
    }
}