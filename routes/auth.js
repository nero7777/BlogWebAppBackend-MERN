const express = require('express');
const router = express.Router();
const {check , validation} = require("express-validator");
const {isSignedIn , signin , signup , signout} = require("../controllers/auth")

//create user
router.post(
    "/signup",[
        check('name','name should be minimum of three char').isLength({min:3}),
        check('email','enter valid email').isEmail(),
        check('password','password should be minimum of three char').isLength({min:3})
    ], signup);

//sign in route for the user who has already signed up
router.post('/signin',[
    check('username').isLength({min:5}).withMessage('username should be atleast of 5'),
    check('password').isLength({min:5}).withMessage('password should be atleast of 5 characters')
],signin);

//signout route for user to signout
router.get("/signout",isSignedIn,signout)

module.exports = router;