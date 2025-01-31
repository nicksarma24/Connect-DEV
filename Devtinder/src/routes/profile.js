const express=require("express")
const profileRouter=express.Router(); 
const {validateEditedProfileData}=require("../utils/validation")

const {userAuth}=require("../middlewares/auth")

profileRouter.get("/profile/view", userAuth, async(req, res)=>{
    try{
        const user=req.user
        const { token } = req.cookies; //getting token 
    
        res.json( {user, token}); //sending token with user
    } catch(err){
        res.status(400).send("Error:"+err.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
        if(!validateEditedProfileData(req)) throw new Error("invalid edit request")
        
        const loggedInUser=req.user
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
        await loggedInUser.save()
        res.send(`${loggedInUser.firstName}, you profile has been updated`)
    } catch(err){
        res.status(400).send("ERROR"+err.message)
    }
})

module.exports=profileRouter
