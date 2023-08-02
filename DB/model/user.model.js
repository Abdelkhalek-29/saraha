import { Schema , model } from "mongoose";

const userSchema = new Schema({
    
    firstName :String , 
    lastName :String ,
    userName :{type:String , required:true},
    password :{type:String , required:true},
    email :{type : String , required:true, unique:true , lowercase:true},
    confirmEmail :{type: Boolean , default:false}, 
    gender : {type : String , default:'male' , enum:['male', 'famale']},
    phone :String ,
    age :String ,
    profileImage :[{seccure_url:String , public_id: String}] ,
    coverImage : [{seccure_url:String , public_id: String}] 

},{timestamps:true})
const userModel=model("User" , userSchema);
export default userModel