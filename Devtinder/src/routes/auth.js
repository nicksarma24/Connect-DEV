const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    try {
        // Validating
        validateSignUpData(req);

        const { firstName, lastName, emailID, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailID,
            password: passwordHash,
        });

        const savedUser=await user.save();
        const token=await savedUser.getJWT();
        res.cookie("token", token,{
            expires: new Date(Date.now()+8*3600000)
        })


        res.json({message:"User added successfully", data: savedUser})
       
    } catch (err) {
        console.log(err);
        res.status(400).send("Error while saving the user");
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailID, password } = req.body;
        const user = await User.findOne({ emailID: emailID }); // Checking the email 
        if (!user) {
            return res.status(400).send("Email is not valid");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            // console.log(token);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Secure cookies in production
                maxAge: 3600000, // Optional: 1 hour
            });
            return res.json({ message: "Login successfully", user, token });
        } else {
            return res.status(400).send("Password did not match");
        }
    } catch (err) {
        res.status(400).send("Error" + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("Logout successfully");
});

module.exports = authRouter;
