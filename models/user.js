const mongoose = require('mongoose');
const {v4} = require('uuid');
const crypto = require('crypto');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name:{
       type:String,
       required:true
        },
        email:{
            type:String,
            required:true
        },
    blogs:{
        type:Array,
        default:[{
            type:ObjectId,
            ref:'Blog'
        }]
     },
      role:{
        type:Number,
        default:0
     },
     encrypted_password:{
        type:String,
        required:true
     },
     salt:{
         type:String,
         required:true
        } ,
},{timestamps:true});

userSchema.virtual("password")
.set(function(password){
    this._password = password
    this.salt =  v4();
    this.encrypted_password = this.securePassword(password) 
})
.get(function(){
    return this._password
})


userSchema.methods = {
    authenticate : function(password){
        return this.encrypted_password === this.securePassword(password)
    },
    securePassword : function(password){
        if(!password) return "";
        try{
            return crypto.createHmac('sha256' , this.salt)
            .update(password)
            .digest('hex');
        }catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model('User',userSchema);

