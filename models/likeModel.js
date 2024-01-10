const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user:{
        type: String,
        require: true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post" //reference to the post model
    }
});

module.exports = mongoose.model("Like", likeSchema);