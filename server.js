const express= require("express");
const bp=require('body-parser');
const bcrypt=require("bcrypt");
const cors=require('cors');
const mongoose=require("mongoose");
const app = express();



const registerRoute=require('./Routes/registerRoute');
const quizRoute=require('./Routes/quizRoute');
const signinRoute=require('./Routes/signinRoute');

app.use(bp.urlencoded({extended:false}));
app.use(bp.json());
app.use(cors());

console.log(process.env.MONGO_ATLAS_PWD);
mongoose.connect("mongodb+srv://qnauser:qna123@quizerr.lmept.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: true
})

.then(() => {
    console.log('Connected to database !!');
  })
  .catch((err)=>{
    console.log('Connection failed !!'+ err.message);
  });

// mongoose.connection.on("connected",()=>{
//     console.log("Mongoose is connected!!!");
// })

app.use('/register',registerRoute);
app.use('/signin',signinRoute);
// app.use('/',quizRoute);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    })
}
const port=process.env.PORT || 5000;
app.listen(port,console.log(`Server is running at ${port}`))