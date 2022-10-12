const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createError = require("../utils/error")

exports.signup=async(req,res,next)=>{
    try{
        const hash = await bcrypt.hash(req.body.password,10)
        const newUser = new User({
            ...req.body,password:hash
        })
        await newUser.save()
        res.status(200).json({
            status:"success",
            msg:"User account has been created successfully"
        })
    }catch (err){
        next(err)
    }
}

exports.signin=async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return next(createError(404,"User not found"))
        const isCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect) return next(createError(400,"Wrong credentials"))
        const token = jwt.sign({id:user._id},process.env.SECRET)
        const {password,...others} = user._doc
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json(others)
    }catch (err){
        next(err)
    }
}

exports.google=(req,res)=>{
    
}