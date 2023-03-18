const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const userRoutes=require('./routes/userRoutes.js')
const app=express();
require("dotenv").config();
// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB connection is successfully");
}).catch((err)=>{
    console.log(err.message);
})
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port : ${process.env.PORT}`)
})