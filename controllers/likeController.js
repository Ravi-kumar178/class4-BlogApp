//import the model
const Like = require("../models/likeModel");
const Post = require("../models/postModel");

//business logic
exports.likePost = async(req,res)=>{
    try{
        const {post,user} = req.body;
        const like = new Like({post,user});
        //save
        const saveLike = await like.save();
        //update in post
        const updatePost = await Post.findByIdAndUpdate(post, {$push: {likes:saveLike._id}},{new:true})
                           .populate("likes")
                           .exec();
                   
         res.json({
            post:updatePost
         })
    }
    catch(err){
        return res.status(500).json({
            err : "Error while liking post"
        })
    }
}

//unlike post
exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

        if (!deletedLike) {
            return res.status(404).json({
                err: "Like not found"
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $pull: { likes: deletedLike._id } },
            { new: true }
        );

        res.json({
            post: updatedPost
        });
    } catch (err) {
        console.error("Error while unliking post:", err);

        return res.status(500).json({
            err: "Internal server error while unliking post"
        });
    }
}