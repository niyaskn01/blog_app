const { hashPassword, comparePassword } = require('../helpers/authHelpers');
const userModel=require('../model/userModel')

//get users
const getAllUsersController=async(req,res)=>{
  try {
    const users=await userModel.find().select("-password")
    res.status(200).send({
      success:true,
      count:users.length,
      users
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:'error in register user',
      success:false,
      error
    })
  }
}

//register user
const userRegisterController=async(req,res)=>{
  const {name,email,password}=req.body
  if(!name) return res.send({message:'name is required'})
  if(!email) return res.send({message:'email is required'})
  if(!password) return res.send({message:'password is required'})

  try {
    const existingUser=await userModel.findOne({email})
    if(existingUser) return res.send({message:'user already exitsts,please login'})

    const hashedPassword=await hashPassword(password)
    const user=await new userModel({
      name,
      email,
      password:hashedPassword,
      blogs:[]
    }).save()

    res.status(200).send({
      success:true,
      message:'new user created',
      user
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:'error in register user',
      success:false,
      error
    })
  }
}


//login user
const userLoginController=async(req,res)=>{
  const {email,password}=req.body
  if(!email || !password) return res.send({message:'please provide both fields'})
  try {
    const user=await userModel.findOne({email})
    if(!user) return res.send({message:"invalid email"})

    const existingUser=await comparePassword(password,user.password) 
    if(!existingUser) return res.send({message:'invalid password'})

    res.status(200).send({
      success:true,
      message:'login successfull',
      user
    })
  } catch (error) {
    
  }
}

//get user blogs
const userBlogsController=async(req,res)=>{
  const {userID}=req.params
  try {
    const blogs = await userModel
    .findById(userID)
    .populate({
      path: 'blogs',
      populate: {
        path: 'user',
        select: 'name email _id image',
      },
    });
    res.status(200).send({
      success:true,
      blogs
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'error in getting blogs',
      error
    })
  }
}


module.exports={
  getAllUsersController,
  userLoginController,
  userRegisterController,
  userBlogsController
}