const blogModel=require('../model/blogModel')
const userModel = require('../model/userModel')
const mongoose=require('mongoose')


//get all blogs
const getAllBlogsController=async(req,res)=>{
  try {
    const blogs=await blogModel.find().populate('user').sort({createdAt:-1})
    if(!blogs) return res.send({message:'no blogs found'})

    res.status(200).send({
      success:true,
      blogCount:blogs.length,
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

//create blog
const createBlogController=async(req,res)=>{
  const {title,description,image,user}=req.body
  if(!title || !description || !image) return res.send({message:'provide all fields'})

  try {
    let existingUser=await userModel.findById(user)
    if(!existingUser) return res.send({message:'user not found'})
    const newBlog= new blogModel({title,description,image,user})

    await newBlog.save()
    existingUser.blogs.push(newBlog)
    await existingUser.save();

    res.status(200).send({
      success:true,
      message:'new blog created',
      newBlog
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

//update
const updateBlogController=async(req,res)=>{
  const {title,description,image}=req.body
  const {blogID}=req.params
  try {
    const blog=await blogModel.findByIdAndUpdate(blogID,req.body,{new:true})

    res.status(200).send({
      success:true,
      message:'blog updated',
      blog
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

//delete
const deleteBlogController=async(req,res)=>{
  const {blogID}=req.params
  try {
    const blog = await blogModel
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(blogID)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'error in getting blogs',
      error
    })
  }
}

//get single blog
const getSingleBlogController=async(req,res)=>{
  const {blogID}=req.params
  try {
    const blog=await blogModel.findById(blogID)
    res.status(200).send({
      success:true,
      blog
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
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getSingleBlogController
}







    // const session=await mongoose.startSession()
    // session.startTransaction()
    // await newBlog.save({session})
    // existingUser.blogs.push(newBlog)
    // await existingUser.save()
    // await session.commitTrancsaction()