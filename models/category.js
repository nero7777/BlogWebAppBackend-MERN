const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   name : {
       type : String,
       required : true,
       maxlength : 24 
   }
},
{timestamps : true}
)

module.exports = mongoose.model("Category",categorySchema);