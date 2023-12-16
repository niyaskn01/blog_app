import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateBlogs() {
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [image,setImage]=useState('')
  const user=localStorage.getItem('userID')
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const postData={title,description,image,user}
    try {
      const {data}=await axios.post('/blog/create-blog',postData)
      if(data.success){
        toast.success(data.message)
        setTitle('')
        setDescription('')
        setImage('')
        navigate('/my-blogs')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('error in creating post')
    }
  }
  return (
    <>
     <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Create A Pots
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            onChange={(e)=>setImage(e.target.value)}
            value={image}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            onClick={handleSubmit}
            type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
        </Box>
    </>
  )
}

export default CreateBlogs