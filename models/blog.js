const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


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
    comments : {
        type:Array,
        default:[{
            data : {
                type:String,
                default:''
            },
            user:{
                type : ObjectId,
                ref : "User",
                required : true
            }}
        ]
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Blog' , blogSchema);