const express = require('express');
const router = express.Router();

const {getUserById} = require("../controllers/user")
const {isSignedIn , isAuthenticated , isAdmin} = require('../controllers/auth');
const {getCategory,getCategoryById,getAllCategories,createCategory,updateCategory,deleteCategory} = require("../controllers/category");

router.param("categoryId",getCategoryById)
router.param("userId",getUserById);

//getting all categories
router.get('/category/:categoryId',getCategory);
router.get('/categories',getAllCategories);

//creating category
router.post('/category/create/:userId',isSignedIn,isAuthenticated,isAdmin,createCategory);

//updating category
router.put('/category/update/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin,updateCategory);

//delete category
router.delete('/category/delete/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteCategory);


module.exports = router;