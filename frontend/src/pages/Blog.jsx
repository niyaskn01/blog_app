import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BlogCard from '../components/BlogCard'
import { Box, Modal, Typography } from '@mui/material'


function Blog() {
  const [blogs,setBlogs]=useState([])

  const fetchBlogs=async()=>{
    try {
      const {data}=await axios('/blog/get-blog')
      if(data?.success){
        setBlogs(data.blogs)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('error in getting blogs')
    }
  }

  useEffect(()=>{
    fetchBlogs()
  },[])
  return (
    <>
    {
      blogs && blogs.map(blog=>(
        <div key={blog?.user?._id}>
          <BlogCard
            
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog?.user?.name}
            time={blog.createdAt}

      />
      
        </div>
      ))
      
    }
      
    </>
  )
}

export default Blog