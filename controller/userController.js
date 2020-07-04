const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");



exports.loginUser = (req,res,next) => {

    User.findOne({email:req.body.email})
       .then(user => {
           if(user){
            return   res.status(422).json({msg:"user already exist"})
           }else {
              bcrypt.hash(req.body.password,10, (err,hash) => {
                   if(err){
                       res.status(500).json(err)
                   }
                 const user = new User ({
                     _id:mongoose.Types.ObjectId(),
                     name:req.body.name,
                     email:req.body.email,
                     password:hash
                 })
                 user.save()
                 .then(user => {
                    res.status(201).json(user)
                 })
                 .catch(err => {
                     res.status(400).json(err)
                 })
              })
           }
       })
      
 };

 exports.logoutUser = (req,res,next) => {
  
    User.find({email:req.body.email})
        .exec()
         .then(user => {
             if(user.length < 1) {
              return  res.status(401).json({err:"Auth failed"})
             }

             bcrypt.compare(req.body.password,user[0].password,(err,result) => {
                 if(err){
                  return res.status(401).json({err:"Auth failed"})
                 }
                 if(result){
                     const token = jwt.sign({
                        email:user[0].email,
                        userId:user[0]._id},
                          process.env.jwtScreet,
                          {expiresIn:"10000hr"}
                          )
                       return res.status(200).json(token)
                 }
                 res.status(401).json({err:"Auth failed"})
             })
         })
         .catch(err => {
             res.status(500).json(err)
         })
};