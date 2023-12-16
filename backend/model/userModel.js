const mongoose=require('mongoose')
const shcema=mongoose.Schema

const userSchema=new shcema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  blogs:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'blog'
    }
  ]
},{timestamps:true})

const userModel=mongoose.model('user',userSchema)
module.exports=userModel