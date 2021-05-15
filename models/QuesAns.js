const mongoose=require("mongoose");
const qnaSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    question: {type:String,required:true},
    optionA: {type:String,required:true},
    optionB:{type:String,required:true},
    optionC:{type:String,required:true},
    optionD:{type:String,required:true}
});
module.exports=mongoose.model("QuesAns",qnaSchema)