import {Message} from "../../../../DB/model/message.model.js"
import { asyncHandler } from "../../../utils/errorHandling.js";
import userModel from "../../../../DB/model/user.model.js";

export const sendMessage = asyncHandler(async(req,res,next) =>{
    const {content , receiverId} =req.body;

    const user=await userModel.findById(receiverId);

    if(!user)return next(new Error("User nor found !"))

    const msg=await Message.create({content , receiverId})
}) 

export const userMessages=asyncHandler(async(req,res,next) =>{

    const id=req.user._id;

    const msgs=await Message.find({receiverId:id})

    return res.json({succes:true , results:msgs})
    
})