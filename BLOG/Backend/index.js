require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const Cors=require("cors");
const app=express();
const authRoutes=require("./routes/auth");
app.use(Cors());
app.use(express.json());

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(() => {
   console.log("MongoDB connected");
})
.catch((err) => {
   console.log(err);
});

app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("ApI running");
});

app.listen(5000,()=>{
    console.log("server is live");
})
