import { error } from "console";
import userModel from "../../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs'
import { asyncHandler } from "../../../utils/errorHandling.js";
import jwt from 'jsonwebtoken';
import sendEmail from '../../../utils/email.js'
import * as validators from '../validation.js'
export const signup =asyncHandler( async(req,res,next)=>{
    const {firstName , lastName , userName , email , password} =req.body;
   // console.log({firstName , lastName , userName , email , password});

    const checkUSer = await userModel.findOne({email})
    if(checkUSer) {
       // return res.json({message: "email exist"})
      // throw new error("Email exist")
      return next(new Error("Email Exist") , {cause : 409})
    }
    const hashPassword = bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND))
    const user =await userModel.create({firstName , lastName , userName , email , password :hashPassword})

    const token =jwt.sign({id: user._id ,email:user.email} ,process.env.EMAIL_SIGNATURE ,{expiresIn: 60*5})
    const newConfirmEmailToken =jwt.sign({id: user._id ,email:user.email} ,process.env.EMAIL_SIGNATURE ,{expiresIn: 60*5})

    const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const requestNewEmaillink=`${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${newConfirmEmailToken}`

    const html =`
    <a href="${link}">confirm Email</a>
    <br>
    <br>
    <a href="${requestNewEmaillink}">Request new confirm email</a>
    `
    await sendEmail({to: email , subject: "Conformation Email" ,html})
    return res.status(201).json({message:"Done" , user})
   } 

)





export const confirmEmail=asyncHandler(async(req,res,next) =>{
    const token=req.params;
    console.log(token)
    const decoded=jwt.verify(token ,process.env.EMAIL_SIGNATURE);
    console.log(decoded);
    const user=await userModel.findByIdAndUpdate(decoded.id ,{confirmEmail:true})
    return user ? res.json({message:"Done"}) :next(new Error("Not register account" , {cause: 404}))

})



export const newConfirmEmail=asyncHandler(async(req,res,next) =>{
    const {token}=req.params;
    console.log(token)
    const decoded=jwt.verify(token ,process.env.EMAIL_SIGNATURE);
    console.log(decoded);
    const user=await userModel.findById(decoded.id ,{confirmEmail:true})
    if(!user) {
        return res.json({message:"Ops you don't have account yet"})
    }
    if(user.confirmEmail) {
        return res.redirect("http://localhost:4200/#/login")
    }
    const newToken=jwt.sign({id:user._id , email:user.email } ,process.env.EMAIL_SIGNATURE,{ expiresIn: 60*2})

    const link =`${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
    const hrml = `<a href="${link}">Confirm Email</a>`
    await sendEmail({to:user.email, subject:"Confirmation Email" , html })  
    return res.send(`<p>Check your inbox now </p>`)

})



export const login =asyncHandler(async(req,res,next) =>{

    const {email , password} = req.body;

        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({message : "Email Not Exist" , cause : 404})
        }
        const match = bcrypt.compareSync(password , user.password)
        if(!match) {
            return res.json({message :"In - valid login data" ,  cause:400})
        }
        const token =jwt.sign(
            { userName :user.userName , id:user._id , isLoggedIn:true},
            process.env.TOKEN_SIGNATURE, 
            {expiresIn:60 * 60}
        )
        return res.status(200).json({message : "Done" , token})
    }
)

