const validator=require("validator")

const validateSignUpData=(req)=>{
    const {firstName, lastName, emailID, password}=req.body; 
   
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    } else if( !validator.isEmail(emailID)){
        throw new Error("Email id is not valid")
    }
}
const validateEditedProfileData = (req) => {
    const allowedEdited = [
        "firstName", "lastName", "emailID", "gender", "age", "skills", 
        "about","photo",
    ];
    
    // Check if every field in req.body is allowed
    const isEditedAllowed = Object.keys(req.body).every((field) => 
        allowedEdited.includes(field)
    );
    
    return isEditedAllowed;
};

module.exports={
    validateSignUpData, validateEditedProfileData
};