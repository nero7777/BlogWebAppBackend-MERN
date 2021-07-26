const {
    Blog,Comment
} = require("../models/blog");

exports.getBlogById = (req, res, next, id) => {
    Blog.findById(id, (err, blog) => {
        if (err) res.status(400).json({
            error: "no blog found"
        });
        else {
            req.blog = blog;
            next();
        }
    })
}

exports.getAllBlogs = (req, res) => {
    Blog.find({}, (err, foundBlogs) => {
        if (err) {
            return res.status(400).json({
                error: "Cannot find Blogs in DB !!"
            })
        }
        res.json(foundBlogs);
    })
}

exports.getBlogsByCategory = (req, res) => {
    Blog.findById({
        category: req.categoryId
    }, (err, foundBlogs) => {
        if (err) {
            return res.status(422).json({
                error: "Cannot get blogs by Category !!"
            })
        }
        res.json(foundBlogs);
    })
}

//Todo : => Get Back Here
// exports.getBlogsByPopularity = (req,res) =>{
//     Blog.find()
// }

exports.createBlog = (req, res) => {

    const blog = new Blog(req.body);

    blog.save((err, createdBlog) => {
        if (err) {
            return res.status(422).json({
                err,
                error: "Cannot Create Blog !!"
            })
        }
        res.json(createdBlog);
    })
}

    
        exports.deleteBlog = (req, res) => {
            Blog.findByIdAndDelete(req.blog.id, (err, deletedBlog) => {
                if (err) res.status(400).json({
                    error: 'Not able to delete blog'
                });
                else
                    res.status(200).json({
                        message: 'blog deleted'
                    });
            })
        }



       
exports.updateBlog = (req, res) => {
    const isComments = req.query.comment;
    console.log(isComments);
    if (!isComments)
    Blog.findByIdAndUpdate(req.blog.id, {
            $set: req.body
        }, {
            new: true
        }, (err, updatedBlog) => {
            if (err) return res.status(400).json({
                error: 'not able to update blog'
            })
            else
                return res.status(200).json(updatedBlog);
        })
    else {
        console.log('in else condition');
        Blog.findById(req.blog.id).exec((err,foundBlogs) =>{
            if(err){
                return res.status(400).json({
                    error : "cannot update blog"
                })
            }
            res.status(200).json()
        })
        
        }    
    }




    // const comments = [];
    //     Blog.findById(req.blog.id).exec((err, blog) => {
    //             if (err) return res.status(400).json({
    //                 error: "no blog found"
    //             });
    //             console.log(blog)
    //             const newComment = new Comment(req.body);
    //             console.log(req.body)
    //             blog.comments.push(req.body);
    //             blog.save((err ,updatedBlog) => {
    //                 if (err) return res.status(400).json({
    //                     error: "cannot update blog comments"
    //                 }) 
    //                 else
    //                 res.status(200).json(updatedBlog)
    //             })
    //         })