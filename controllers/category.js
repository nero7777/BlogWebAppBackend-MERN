const Category = require("../models/category");

exports.getCategoryById = (req,res,next,id) => {
    
  Category.findById(id).exec((err,category) => {
    if(err){
       return res.status(400).json({
            error : "Category not found !!"
        })
      }
      req.category = category;
      next();
    })
}

exports.getCategory = (req,res) => {
    return res.status(200).json(req.category);
}

exports.getAllCategories = (req ,res) => {
    Category.find({},(err,categories) => {
        if(err || categories.lenght === 0)
          return  res.status(400).json({
                error:'No categories found'
            });
         return res.status(200).json(categories);  
    });
} 


exports.createCategory = (req,res) => {
    const category = new Category(req.body);

    if(!category.name){
        return res.status(422).json({
            error : "Category Name Cannot be Empty !!"
        })
    }
    category.save((err,category) => {
        if(err){
            return res.status(422).json({
                error : "Couldn't save Category in DB !!"
            })
        }
        return res.status(200).json(category)
    })
   
}

exports.updateCategory = (req,res) => {
   
    Category.findByIdAndUpdate(req.category.id,{name : req.body.name},{new:true},(err,category) => {
        if(err){
            return res.status(400).json({
                error : "Couldn't Update Category in DB!!"
            })
         }
        res.status(200).json(category)
    })
  }


exports.deleteCategory = (req,res) => {
    Category.findByIdAndRemove(req.category.id , (err , category) => {
        if(err)  return res.status.json({error:'category cannot be delete'})
            res.status(200).json({message:"category deleted successfully"});
    })
}
