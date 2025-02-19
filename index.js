const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const AuthRoutes=require("./routes/Auth_routes");
const cors=require("cors");
const PORT=process.env.PORT||8000;
const app=express();
app.use(cors());
app.use(express());
app.use(express.json());
app.use("/auth",AuthRoutes);
mongoose.connect(`${process.env.DB}`,{useNewUrlParser: true,
    useUnifiedTopology: true});
    const db=mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("we're connected"); 
    });
app.listen(8080,()=>{
    console.log("server is running");
})