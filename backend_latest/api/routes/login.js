const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Users=require('../models/userlogin');
const jwt = require("jsonwebtoken");

//loacl:/signup/
router.post('/',(req,res,next)=>{
    Users.find({email:req.body.email})
    .exec()
    .then(user=>{
        if (user.length>=1) {
            return res.status(409).json({
                message: 'email exists'
            });
        }
        else{
            const user_log=new Users({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                mobile: req.body.mobile
            });
            user_log
            .save()
            .then(result =>{
                console.log(result);
                res.status(201).json({
                    message:'User Created'
                });
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                error: err
                });
            });
        }
    });
//signup/login
    router.post("/login", (req, res, next) => {
      Users.find({ email: req.body.email })
        .exec()
        .then(user => {
          if (user.length < 1) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          return res.status(200).json({
            message: "Auth successful",
            createdUser: {
              first_name: user[0].first_name,
              last_name: user[0].last_name,
              email: user[0].email,
              mobile: user[0].mobile,
              _id: user[0]._id
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });


    router.delete("/:userId", (req, res, next) => {
        Users.remove({ _id: req.params.userId })
          .exec()
          .then(result => {
            res.status(200).json({
              message: "User deleted"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
        })
    
});

module.exports = router;