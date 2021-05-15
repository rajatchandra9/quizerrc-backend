const express=require('express');
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const router=express.Router();

const GenUser=require('../models/GenUser');

router.post("/",(req,res)=>{
    console.log("reached route");
    const {email,name,password,rollNo}=req.body;
    var alphaNum=/^[0-9a-zA-Z]+$/;
    if(email==="" || name==="" || password==="" || rollNo===0){
        res.status(409).json("Blank Error");
    }
    else if(password.length<6 || !(alphaNum.test(password))){
        res.status(409).json("Password Error");
    }
    else{
        console.log("reached B");
        GenUser.find({email:email})
        .exec()
        .then(sameUser=>{
            if(sameUser.length>=1){
                return res.status(409).json("Email Already Used");
            }
            else{
                console.log("reached C");
                bcrypt.hash(password, 10, function(err, hash) {
                    if(err){
                        console.log("reached D");
                        return res.json("Invalid Password");
                    }
                    else{
                        console.log("reached bcrypt else");
                        const newUser=new GenUser({
                            _id:new mongoose.Types.ObjectId(),
                            name:name,
                            email:email,
                            password:hash,
                            rollNo:rollNo,
                            marked:false,
                            quesRes:[],
                            totalMarks:0,
                            userType:"normal"
                        });
                        newUser.save()
                        .then(result=>{
                            console.log("Succesfully registered as ",result.email);
                            res.json({
                                email:result.email
                            });
                        })
                        .catch(err=>console.log(err));
                        // res.json({
                        //     email:newUser.email
                        // });
                    }
                });
            }
        })   
    }
})

module.exports=router;