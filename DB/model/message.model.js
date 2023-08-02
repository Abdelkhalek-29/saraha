import { Schema , Types , model } from "mongoose";

const msgSchema = new Schema(
    {
        content:String,
        receiverId: {
            ref:"User" ,
            type: Types.ObjectId
        },
    },
    {timestamps :true}
);

export const Message=model("Message" , msgSchema)