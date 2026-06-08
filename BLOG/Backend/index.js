require("dotenv").config();
const express = require("express");
const Cors = require("cors");
const connectDB = require("./config/db"); 
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

const app = express();

app.use(Cors());
app.use(express.json());

connectDB(); 

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("API running");
});

app.listen(PORT, () => {
    console.log("server is live");
});
