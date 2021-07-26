const express = require('express');
const router = express.Router();
const {getUserById,getAllUsers,getParticularUser,getUserBlogs,updateUser,updateUserToPremium,deleteUserById} = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")

//router parameter with middleware
router.param("userId",getUserById);

//get all users from db
router.get("/users",getAllUsers);

//get specific user from db 
router.get("/users/:userId",getParticularUser);


//get blogs of specific user
router.get("/user/blogs/:userId",getUserBlogs);

//route to update user profile for himself
router.put("/user/:userId",isSignedIn , isAuthenticated , updateUser);

//(promote) user Admin api
router.patch("/users/promote/:userId",isSignedIn,isAuthenticated,isAdmin,updateUserToPremium);

//(delete/block) user Admin api
router.delete("/users/:userId",isSignedIn,isAuthenticated,isAdmin,deleteUserById);



module.exports = router;