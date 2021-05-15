const express=require('express');
const mongoose=require("mongoose");
const router=express.Router();

const QuesAns=require('../models/QuesAns');

router.get('/',(req,res)=>{
    QuesAns.find({})
        .then((data)=>{
            console.log("Data: ",data);
            res.json(data);
        })
        .catch(err=>console.log);
});
router.post('/',(req,res)=>{
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
router.delete('/:quizid',(req,res)=>{
    QuesAns.findByIdAndDelete(req.params.quizid).then((quizq) => {
        if (!quizq) {
            return res.status(404).send();
        }
        res.json(quizq);
    }).catch((error) => {
        res.status(500).send(error);
    })
})
router.patch('/:quizid', (req, res) => {
    QuesAns.findByIdAndUpdate(req.params.quizid, req.body, {new: true}).then((quizq) => {
        if (!quizq) {
            return res.status(404).send();
        }
        res.json(quizq);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports=router;
