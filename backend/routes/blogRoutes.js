const express=require('express')
const { getAllBlogsController, createBlogController, updateBlogController, deleteBlogController, getSingleBlogController } = require('../controllers/blogController')
const router=express.Router()

//get all blogs
router.get('/get-blog',getAllBlogsController)

//create blog
router.post('/create-blog',createBlogController)

//update blog
router.put('/update-blog/:blogID',updateBlogController)

//delete
router.delete('/delete-blog/:blogID',deleteBlogController)

//get single blog
router.get('/get-blog/:blogID',getSingleBlogController)

module.exports=router