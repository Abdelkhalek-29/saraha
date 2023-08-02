import userModel from "../../../../DB/model/user.model.js"
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



export const getUsers =asyncHandler(async(req,res) => {
  
  const user = await userModel.findById(req.user._id)
    return res.json({ message: "Done" , user:req.user})
})

export const profileImage=asyncHandler(async(req,res,next) =>{
  const {secure_url , public_id}=await cloudinary.uploader.upload(req.file.path ,{folder:`saraha/user/${req.user._id}/profileImage`})
  const user =await userModel.findByIdAndUpdate(
    req.user._id,
    {profileImage: (secure_url, public_id)},
    {new:true}
  )
  return res.json({message:"Done" ,user , file:req.file })
})




export const profileCoverImage=asyncHandler(async(req,res,next) =>{
  const coverImages=[]
  for (const file of req.files) {
  const {secure_url , public_id}=await cloudinary.uploader.upload(req.file.path ,{folder:`saraha/user/${req.user._id}/profileCover`})
  coverImages.push({secure_url , public_id})
  }
  const user =await userModel.findByIdAndUpdate(
    req.user._id,
    {coverImages: (secure_url, public_id)},
    {new:true}
  )
  return res.json({message:"Done" ,file:req.file , cloud})
})