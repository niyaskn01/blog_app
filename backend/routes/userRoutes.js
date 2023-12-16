const express=require('express')
const { getAllUsersController, userRegisterController, userLoginController, userBlogsController } = require('../controllers/userController')
const router=express.Router()

//get all users
router.get('/get-users',getAllUsersController)

//register
router.post('/register',userRegisterController)

//login
router.post('/login',userLoginController)

//get user blogs
router.get('/get-blogs/:userID',userBlogsController)




module.exports=router