const User = require("../models/user");
const {check , validationResult} = require("express-validator");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
// const { token } = require("morgan");

//roles : 0 => simple user
//roles : 1 => premium user
//roles : 2 => Admin

//method for signing up user
exports.signup = (req,res) => {
    //destructuring error in validation results to check for validation errors
    const {errors} = validationResult(req);

    if(!errors.length===0){
       return res.status(422).json({
            error:errors[0].msg
        });
    }

    const user = new User(req.body);
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                error:'Unable to save user in db'
            });
        }
        res.status(200).json(user);
    });
}

//signin in method for user
exports.signin = (req,res) => {
    
    //destructuring req body to get email and password
    const {email , password} = req.body;
    
    //destructuring error in validation results to check for validation errors
    const {errors} = validationResult(req);
    if(!errors.length === 0){
        return res.status(422).json({
            error:errors[0].msg
        });
    }

    //finding user in DB and authenticating the user if found
    User.findOne({email},(err , user)=>{
        if(err || !user){
           return res.status(422).json({
                error:"User not found in DB !!"
            })
        }
        if(!user.authenticate(password)){
            return res.status(422).json({
                error:"Email and password do not Match !!"
            });
        }
   
    
    //once the user is found in DB creating token for user
    //and signing it using a secret key and userid
    const token = jwt.sign({_id : user._id},process.env.SECRET)
    
    //creating a cookie and putting the user token in the cookie and setting a timeout for cookie
    res.cookie('token' , token, {expire: new Date() + 9999});

    //sending the token and data to frontend
    const{_id,name,role} = user;
    return res.status(200).json({token ,user:{_id,name,email,role}});

})
}

//signout method
exports.signout = (req,res) => {
    res.clearCookie("token");
    return res.json({
        message :"Signed out Successfully !!"
    });
}

//middleware for isSignedIn
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    requestProperty : 'auth',
    algorithms: ['HS256']
  });

//middleware for isAuthenticated
exports.isAuthenticated = (req, res , next) => {
    
    if(!(req.auth && req.profile && req.profile._id == req.auth._id)){
    return res.status(403).json({
            error: 'not authenticated'
        });
    }
    

    next()
}

//middleware for isAdmin
exports.isAdmin = (req,res,next) => {
    if(!req.profile.role === 2){
      return res.status(400).json({
            error : "You are not Admin ACESS DENIED !!"
        })   
    }
    next()
}
//middleware for isPremium
exports.isPremium = (req,res,next) => {
    if(!req.profile.role === 1){
      return res.status(400).json({
            error:'not prime'
        });
    }
    next()
}