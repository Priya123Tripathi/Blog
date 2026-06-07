const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Post = require("../model/Post");

//create Post api
router.post("/",verifyToken,async(req,res)=>{
    try{
    const {title,content}=req.body;
    const post=await Post.create({
     title,
     content,
     author:req.user.id
    });
    res.status(201).json(post);
    }catch(err){
    console.log(err);
    res.status(500).json({
        message:"Server Error"
    });

    }
});

//get all post

router.get("/",async(req,res)=>{
try{
const posts=await Post.find().
populate("author","username email");

res.status(200).json(posts);
}catch(err){
  console.log(err);
   res.status(500).json({
    message:"Server Error"
  });
}
});

router.get("/:id" ,async(req,res)=>{
try{
const post=await Post.findById(req.params.id)
.populate("author","username email");

if(!post){
    return res.status(404).json({
        message:"Post not found"
    });
}
res.status(200).json(post);

}catch(err){
console.log(err);
res.status(500).json({
    message:"Server Error"
   });
 }
});
// UPDATE POST
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // sirf apna post update kar sake
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        const updated = await Post.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title, content: req.body.content },
            { new: true }
        );
        res.status(200).json(updated);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE POST
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // sirf apna post delete kar sake
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// ADD COMMENT
router.post("/:id/comment", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.comments.push({
            user: req.user.id,
            text: req.body.text
        });

        await post.save();
        res.status(200).json(post);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});




module.exports=router;