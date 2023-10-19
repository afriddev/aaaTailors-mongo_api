import mongoose from 'mongoose'




const messageingSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        immutable:true,
    },
    token:{
        type:String,
        required:true,
        immutable:true, 
    },
    

})


const  messageingModel = mongoose.model("userTokens",messageingSchema)
export default messageingModel