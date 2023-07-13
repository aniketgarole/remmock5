const express = require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.model");

const userRouter = express.Router()


userRouter.post("/signup", async(req, res) => {
    try {
        const {password} = req.body
        bcrypt.hash(password, 5, async function(err, hash) {
            if(hash) {
                const user = new UserModel({...req.body, password: hash})
                await user.save()
                res.status(200).json({"msg": "new user has been signed up"})
            } else if (err) {
                res.status(200).json({"err": err.message})
            }
        });

    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})



userRouter.post("/login", async(req, res)=> {
    try {
        const {email, password} = req.body
        const user = await UserModel.findOne({email})
        if (user) {
            const passwordFromDB = user.password
            const passwordSentByUser = password
            const userId = user._id
            bcrypt.compare(passwordSentByUser, passwordFromDB, function(err, result) {
                if(result) {
                    const token = jwt.sign({email, userId }, 'avenger');
                    res.status(200).json({"msg": "Login Successful", token})
                } else if (err) {
                    res.status(200).json({"err":err.message})
                }
            });
        } else {
            res.status(200).json({"msg": "Invalid Credentials"})
        }
    } catch (error) {
        res.status(400).json({"err":error.message})
    }
})






module.exports = {userRouter}