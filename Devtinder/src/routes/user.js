const express=require("express")
const userRouter=express.Router()

const {userAuth}=require("../middlewares/auth")
const ConnectionRequest=require("../models/connectionRequest")
const User=require("../models/user")

//fetch the pending req, if like right swipe jisne kiya hai tumne but tumne koi aciton nahi liya 
userRouter.get("/user/request/received", userAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user; 
        
        const connectionRequests=await ConnectionRequest.find({
            toUserID: loggedInUser._id,
            status: "interested", 
        })
        .populate("fromUserID", ["firstName", "lastName","about","age","photo"])
       
        res.json({
            message:"Data fetched successfully", 
            data: connectionRequests,
        })
    }
    catch(err){
        console.error("Error:", err);
        res.status(400).send("ERROR: "+err.message)
    }
})

//show your matches
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Fetch accepted connections and populate user details
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserID: loggedInUser._id, status: "accepted" },
                { fromUserID: loggedInUser._id, status: "accepted" },
            ]
        })
        .populate("fromUserID", ["firstName", "lastName", "email", "about","age","photo"]) // Adjust fields as needed
        .populate("toUserID", ["firstName", "lastName", "email", "about","age","photo"]);

        // Map connections to show the relevant user details
        const data = connectionRequests.map((row) => {
            if (row.fromUserID._id.toString() === loggedInUser._id.toString()) {
                return row.toUserID; // Full details of the connected user
            }
            return row.fromUserID;
        });

        res.json({ data });
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
});

//feed api
userRouter.get("/feed", userAuth, async(req,res)=>{
    try{
        //user should see all user cards except his own card, his connections, ignored people, already sent the conn
        const loggedInUser=req.user;

        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        limit=limit>50?50:limit

        const skip=(page-1)*limit

        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {fromUserID: loggedInUser._id}, {toUserID: loggedInUser._id}
            ],
        }).select("fromUserID toUserID")

        const hideUserFromFeed=new Set()
        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserID.toString())
            hideUserFromFeed.add(req.toUserID.toString())
        })

        const users=await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUserFromFeed)}}, 
                {_id:{$ne:loggedInUser._id}},
            ],
        })
        // .select("firstName lastName")
        .skip(skip)
        .limit(limit)
        res.send(users)

    } catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})
module.exports=userRouter; 