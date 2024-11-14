const express=require("express")
const requestRouter=express.Router();
const mongoose=require("mongoose")

const {userAuth}=require("../middlewares/auth")
const ConnectionRequest=require("../models/connectionRequest")
const User=require("../models/user")

requestRouter.post("/request/send/:status/:toUserID", userAuth, async(req,res)=>{
    try{
        const fromUserID=req.user._id; //this is simply the user who is logged in req body me user naam ka document ka id lelo
        const toUserID=req.params.toUserID
        const status=req.params.status

        const allowedStatus=["ignored", "interested"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type: "+status})
        }

        const toUser=await User.findById(toUserID)
        if(!toUser){
            return res.status(400).json({message:"user not found"})
        }

        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[ //checking if this is there in the db 
                {fromUserID, toUserID}, 
                {fromUserID: toUserID, toUserID: fromUserID},
            ]
        }) //if the request is already there in the db then send the response 
        if(existingConnectionRequest){
            return res.status(400).send({message: "Connection Request Already Exists"})
        }

        const connectionRequest=new ConnectionRequest({ //new request is being made 
            fromUserID, toUserID, status, 
        })
        const data=await connectionRequest.save() //data is being saved in db 

        res.json({
            message:req.user.firstName+" is "+status+" in "+toUser.firstName, 
            data,
        })
    }
    catch(err){
        res.status(400).send("ERROR"+err.message)
    }
   
})

requestRouter.post("/request/review/:status/:requestID", userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user; 
        const {status, requestID}=req.params; 

        const allowedStatus=["accepted", "rejected"]; 
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Status not allowed"})
        }

        const connectionRequest=await ConnectionRequest.findOne({ //now the validation will check in ConnectionRequest.js and find one
            _id: requestID,   //this id is the objectid mongoose and not the fromid so in the connectionRequest collection get the _id and accept or reject it 
            toUserID: loggedInUser._id, 
            status: "interested" //when someone has swiped right to you so it has to be interested then only the loggedin user will have the option to reject or accept 
        }) //not handling the ignored case cuz once swiped left then you can't do anything 

//in connecton request accept give the id of the connection request in connection request schema werhe he is interested likha ho 

        if(!connectionRequest){ //if validation fails at api end or api level 
            return res.status(400).send("Connection request not found")
        }
        connectionRequest.status=status; //getting the status from the params
        const data=await connectionRequest.save()
        
        res.json({message: "Connection request "+status, data})
    } catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})
module.exports=requestRouter