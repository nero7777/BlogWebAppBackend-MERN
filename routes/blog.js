const express = require('express');
const router = express.Router();
const {isSignedIn,isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {getCategoryById} = require("../controllers/category");
const {getAllBlogs,getBlogsByCategory,getBlogById,createBlog,updateBlog,deleteBlog,patchBlog} = require("../controllers/blog")

//router parameter with middleware
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);
router.param("blogId",getBlogById);

//get all blogs from db
router.get("/blogs",getAllBlogs);

//get blog by category from db 
router.get("/blogs/:categoryId",getBlogsByCategory);

//get blogs by popularity
//router.get("/blogs/popular",isSignedIn,isAuthenticated,getBlogsByPopularity);

//create blog
router.post("/user/blog/:userId",isSignedIn , isAuthenticated,createBlog);

//update blog
router.put("/user/blog/:blogId/:userId",isSignedIn,isAuthenticated,updateBlog);
//update blog
//router.patch("/user/blog/comments/:blogId/:userId",isSignedIn,isAuthenticated,patchBlog);


//delete blog
router.delete("/user/blog/:blogId/:userId",isSignedIn,isAuthenticated,deleteBlog);







module.exports = router;