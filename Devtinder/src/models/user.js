const mongoose= require('mongoose')
const validator=require("validator")
const jwt=require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required: true, 
        minLength: 4, 
        maxLength: 50,
    }, 
    lastName:{
        type: String
    },
    emailID:{
        type: String, 
        lowercase: true, 
        required: true, 
        unique: true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address");
            }
        }
    },
    password:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    about:{
        type:String,
        default:"This is the default about the user",
    },
    skills:{
        type:[String],
    },
    photo: {  // New field for storing the photo URL
        type: String,
    },
})

userSchema.methods.getJWT=async function(){
    const user=this
    const token=await jwt.sign({_id:user._id}, "abcdefgh",{
        expiresIn:"7D",
    })
    return token
}

const User=mongoose.model("User", userSchema)
module.exports=User
