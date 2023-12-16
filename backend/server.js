const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const db=require('./config/connect')
const userRouter=require('./routes/userRoutes')
const blogRouter=require('./routes/blogRoutes')
const app=express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
db()

const port=process.env.PORT || 8080

app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(port,()=>{
  console.log(`server is running at port ${port}`);
})