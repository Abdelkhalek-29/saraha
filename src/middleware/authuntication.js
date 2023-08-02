import jwt from 'jsonwebtoken'
import userModel from '../../DB/model/user.model.js';
import { asyncHandler } from '../utils/errorHandling.js';


export const auth =asyncHandler(async( req, res, next) =>{

    const {authorization} = req.headers;
    console.log({authorization})
    if (!authorization) {
        return next(new Error("authorization is required" ,{cause :401} ))
    }
    const decoded=jwt.verify(authorization ,"HalandFelLalaland");
     console.log(decoded);
     if(!decoded.id) {
        return next(new Error("In-Valid token payload" , {cause :400}))
     }
     const user = await userModel.findById(decoded.id)
     console.log(user)
     if(!user) {
        return next(new Error( "Nor register account" ,{cause :404}))
     }
     req.user=user
     return next()
})