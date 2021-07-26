const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    userdata : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    data : {
        type : String,
        default : "",
        maxlength : 100 
    }
})
const Comment = mongoose.model("Comment",commentSchema);

const blogSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    category : {
        type : ObjectId,
        ref : "Category",
        required : true
    },
    user : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    body : {
        type:String ,
        rquired :true
    },
    upvotes : {
        type:Number,
        default:0
    },
    downvotes : {
        type:Number,
        default:0
    },
    comments : [commentSchema]
},
{timestamps:true}
);
const Blog = mongoose.model("Blog",blogSchema);

module.exports = {Blog,Comment};