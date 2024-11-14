const mongoose=require("mongoose")

const connectionRequestSchema= new mongoose.Schema(
    {
        fromUserID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //User is the collection name /Schema name we are creating referance of user from connection req
            required: true,
        },
        toUserID: {
            type: mongoose.Schema.Types.ObjectId, 
            ref:"User",
            required: true, //why is required: true condition is necessary is because when you call or make this api call you need to send these things
        }, 
        status:{
            type: String, 
            required: true, 
            enum:{
                values:["ignored", "interested", "accepted", "rejected"], 
                message:`{VALUE} is incorrect status type`, 
            },
        },
    },
    { timestamps: true}
)
connectionRequestSchema.pre("save", function(next){
    const connectionRequest=this; 
    if(connectionRequest.fromUserID.equals(connectionRequest.toUserID)){
        throw new Error("Cannot send connection request to yourself")
    }
    next();
})

const connectionRequestModel=new mongoose.model(
    "ConnectionRequest", connectionRequestSchema
)
module.exports=connectionRequestModel