const {User} = require("../models/user")

exports.getUserById = (req,res,next,id) => {

    User.findById({id} , (err , user)=>{
        if(err){
            res.status(400).json({
                error:err
            });
        }
        req.profile = user;
        next();
    });
} 