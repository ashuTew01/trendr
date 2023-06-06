// import asyncHandler from 'express-async-handler'     //not using for this project.
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";


//POST @ '/auth/register'
// Register User
const registerUser = async (req, res) => {     //the async handler helps us use aync await and not wrap everything in try catches.
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const userExists = await User.findOne({email});

        if(userExists) {
            res.status(400);
            throw new Error("User Already Exists.");
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 100000),      //placeholder value for now
            impressions: Math.floor(Math.random() * 100000)         //placeholder value for now
        });
        delete newUser.password;

        // const savedUser = await newUser.save();
        res.status(201).json(newUser);

    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};


//POST @ /auth/login
//Login User

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user)   return res.status(400).json({ msg: "No such user exists." });

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)  return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;       //it is not working find another mehthod.

        res.status(200).json({ token, user });
        
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

export {
     registerUser, login
};