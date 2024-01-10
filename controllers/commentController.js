//import the model on the basis that we need to add the comment,the user that comment and the post on which the comment is done
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

//Business logic
exports.postComment = async(req,res)=>{
    try{
        const {post,body,user} = req.body;
        const comment = new Comment({post,body,user});
        const savedComment =await comment.save();
        //find and update the comment section in post
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments: savedComment}},{new: true})
                             .populate("comments")
                             .exec();
                  
              res.json({
                post:updatedPost
              })               
    }
    catch(err){
        return res.status(500).json({
            err : "Error while creating comment"
        })
    }
}