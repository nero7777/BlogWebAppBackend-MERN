const User = require("../models/user")

exports.getUserById = (req,res,next,id) => {

    User.findById(id , (err , user) =>{
        if(err){
            res.status(400).json({
                error:err
            });
        }
        req.profile = user;
      
        next();
    });
} 

exports.getParticularUser = (req,res) => {
    return res.json(req.profile);
}


exports.getAllUsers = (req,res) => {
    
        User.find(req.query.name ? {name:req.query.name} : {},(err,userlist) => {
            if(err){
                return res.status(422).json({
                    error: "User Not Found !!"
                })
            }
            res.status(200).json(userlist);
        })
    
}

exports.getUserBlogs = (req,res) => {
    return res.status(200).json(req.profile.blogs);
}

exports.updateUser = (req,res) => {
    
    User.findByIdAndUpdate(req.profile.id,{$set:req.body},{new:true,useFindAndModify:false},(err,updatedUser) => {
        if(err){
            return res.status(422).json({
                error :"Unable to update user !!"
            })
        }
        res.status(200).json(updatedUser)
    })
}

exports.updateUserToPremium = (req,res) => {
    
    User.findByIdAndUpdate(req.body.id,{$set:{role:1}},{new:true},(err,updatedUser) => {
        if(err){
            return res.status(422).json({
                error :"Unable to Promote user !!"
            })
        }
        res.status(200).json(updatedUser)
    })
}

exports.deleteUserById = (req,res) => {
    User.findByIdAndDelete(req.body.id,{useFindAndModify:false},(err,deletedUser) => {
        if(err){
            return res.status(422).json({
                error : "Unable to delete User"
            })
        }
        res.status(200).json({
            message: "User Deleted Successfully !!"
        })
    })
}