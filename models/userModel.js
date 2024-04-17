const mongoose=require('mongoose')
// schema
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required: true
        // default: "student",
      },
      status: {
        type: String,
        required: true,
        default: "pending", // active, inactive or pending
      },
    
})

// model
const users=mongoose.model("users",userSchema)
module.exports=users