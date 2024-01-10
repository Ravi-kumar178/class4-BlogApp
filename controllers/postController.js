//import the post model
const Post = require("../models/postModel");

//business logic
exports.postCreated = async(req,res) => {
    try{
        const {title,body} = req.body;
        const post = new Post({title,body});
        const savePost = await post.save();
        res.json({
            post:savePost
        })
    }
    catch(err){
        return res.status(500).json({
            err : "Error while creating post"
        })
    }
}

//fetch the post using it's id

exports.getPost = async(req,res) => {
    try{
        const posts = await Post.find().populate("comments").populate("likes").exec();
        res.json({
            posts
        })
    }
    catch(err){
        return res.status(500).json({
            err : "Error while fetching post"
        })
    }
}