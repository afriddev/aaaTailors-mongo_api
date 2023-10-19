import mongoose from "mongoose";



const userStatusSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        immutable:true
    },
    status:{
        type:Number,
        default:1,
        required:true
    },
    token:{
        type:String,
        required:true,

    }



})

const userStatusModel = mongoose.model("userStatus",userStatusSchema)
export default userStatusModel


