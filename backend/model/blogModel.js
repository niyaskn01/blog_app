const mongoose=require('mongoose')
const schema=mongoose.Schema

const blogSchema=new schema({
  title:{
    type:String,
    required:[true,'title is require']
  },
  description:{
    type:String,
    required:[true,'description is require']
  },
  image:{
    type:String,
    required:[true,'image is require']
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }
},{timestamps:true})

const blogModel=mongoose.model('blog',blogSchema)

module.exports=blogModel