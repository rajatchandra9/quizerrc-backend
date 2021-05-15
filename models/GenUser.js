const mongoose=require("mongoose");
const userSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name: {type:String,required:true},
    email: {type:String,required:true},
    password:{type:String,required:true},
    rollNo:{type:Number,required:true},
    marked:{type:Boolean,required:true},
    quesRes:{type:Array,required:true},
    totalMarks:{type:Number,required:true},
    userType:{type:String,required:true}
});
module.exports=mongoose.model("GenUser",userSchema)