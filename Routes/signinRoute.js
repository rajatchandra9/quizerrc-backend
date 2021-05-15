const express=require('express');
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const router=express.Router();

const GenUser=require('../models/GenUser');
const QuesAns=require('../models/QuesAns');

router.get('/:id/quiz/',(req,res)=>{
    console.log("in id.quiz");
    QuesAns.find({})
        .then((data)=>{
            console.log("Data: ",data);
            res.json(data);
        })
        .catch(err=>console.log);
});
router.post('/:id/quiz/',(req,res)=>{
    const quesAns=new QuesAns({
        _id:mongoose.Types.ObjectId(),
        question:req.body.quest,
        optionA:req.body.ansA,
        optionB:req.body.ansB,
        optionC:req.body.ansC,
        optionD:req.body.ansD
    });
    quesAns.save().then(result=>{
        console.log("result:",result);
        return res.status(200).json({
            message:"QnA Created",
            quesSet:quesAns
        });
    })
    .catch(err=>{
        console.log("err as field required",err);
        return res.json({
            message:"Wrong"
        });
        
    });
    // if(er===1){
    //     res.json({
    //         message:"Wrong"
    //     })
    // }else{
    //     res.status(200).json({
    //         message:"QnA Created",
    //         quesSet:quesAns
    //     });
    // }
})
router.delete('/:id/quiz/:quizid',(req,res)=>{
    QuesAns.findByIdAndDelete(req.params.quizid).then((quizq) => {
        if (!quizq) {
            return res.status(404).send();
        }
        res.json(quizq);
    }).catch((error) => {
        res.status(500).send(error);
    })
})
router.patch('/:id/quiz/:quizid', (req, res) => {
    QuesAns.findByIdAndUpdate(req.params.quizid, req.body, {new: true}).then((quizq) => {
        if (!quizq) {
            return res.status(404).send();
        }
        res.json(quizq);
    }).catch((error) => {
        res.status(500).send(error);
    })
})


router.post("/",(req,res)=>{
    const {email,password,userType}=req.body;
    GenUser.find({email:email})
    .exec()
    .then(sameUser=>{
        if(sameUser.length<1){
            return res.json("No Such User Exists");
        }else if(sameUser[0].userType!==userType){
            return res.json("No Such User Exists");
        }
        else{
            bcrypt.compare(password,sameUser[0].password, function(err, result) {
               if(result){
                   console.log("Successful log in",sameUser[0].email);
                   return res.json({
                       msg:"Successful",
                       data:{
                           name:sameUser[0].name,
                           _id:sameUser[0]._id
                       }
                   });
               }
               else{
                res.json("User not found");
               }
            });       
        }
    })
    .catch(err=>console.log(err));
})
module.exports=router;