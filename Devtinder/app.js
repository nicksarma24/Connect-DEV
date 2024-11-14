const express=require("express")
const connectDB=require('./src/config/database')
const app=express();
const User=require("./src/models/user")
const cookieParser=require("cookie-parser")
const jwt = require('jsonwebtoken');
const cors = require("cors");

app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}));
app.use(cookieParser())
app.use(express.json())

const authRouter=require("./src/routes/auth")
const profileRouter=require("./src/routes/profile")
const requestRouter=require("./src/routes/request");
const userRouter = require("./src/routes/user");

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

app.get("/feed", async(req,res)=>{
    try{
        const users=await User.find({})
        // console.log(users)
        res.send(users)
    } catch(err){
        res.status(404).send("Something went wrong")
    }
})

app.delete("/user", async(req, res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId)
        res.send("user deleted")
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

app.patch("/user", async(req,res)=>{
    const userId=req.body.userId
    const data=req.body
    try{
        await User.findByIdAndUpdate(userId, data)
        res.send("user updated")
    } catch(err){
        res.status(400).send("something went wrong")
    }
})

connectDB()
.then(()=>{
    console.log("connect successfull");
    app.listen(7777,()=>{
        console.log("server is running on port 7777")
    })
}).catch((err)=>{
    console.log("Did not connect")
})
