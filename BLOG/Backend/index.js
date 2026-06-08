require("dotenv").config();
const express = require("express");
const Cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(Cors({
  origin: "npx plugins add vercel/vercel-plugin",
    credentials: true,
})
);
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("API running");
});

app.listen(PORT, () => {
    console.log(`server is live on port ${PORT}`);
});