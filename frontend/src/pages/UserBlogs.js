import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BlogCard from '../components/BlogCard';
import { Box, Button, InputLabel, Modal, TextField, Typography } from '@mui/material';

function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [open,setOpen]=useState(false)
  const [image,setImage]=useState('')
  const [description,setDescription]=useState('')
  const [blogID,setBlogID]=useState('')
  const [title,setTitle]=useState('')
   
  const userID = localStorage.getItem('userID');
  console.log(userID);

  const handleSubmit=async()=>{
    const {data}=await axios.put(`/blog/update-blog/${blogID}`,{title,description,image})
    if(data?.success){
      setOpen(false)
    }
    
}

  const handleOpen = (blog) => {
    setOpen(true);
    setTitle(blog.title);
    setDescription(blog.description);
    setImage(blog.image);
    setBlogID(blog._id)

  };

  const handleClose = () => {
    setTitle('');
        setDescription('');
        setImage('');
    setOpen(false);
  };

  const getUserBlogs = async () => {
    try {
      const { data } = await axios(`/user/get-blogs/${userID}`);
      if (data?.success) {
        setBlogs(data?.blogs.blogs);
      }
    } catch (error) {
      toast.error('Error fetching blogs');
    }
  };

  useEffect(() => {
    getUserBlogs();
     
  }, [userID]);

  useEffect(()=>{
    console.log('going to rerender');
  },[title,description,image])

  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog?.user?._id}>
            <BlogCard
              handleClose={handleClose}
              handleOpen={() => handleOpen(blog)}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog?.user?.name}
              time={blog.createdAt}
              showIcon
            />

            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                 <Typography variant="h6" component="div" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
                  Edit Blog
                </Typography>
                <InputLabel sx={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>Title</InputLabel>
                <TextField
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <InputLabel sx={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>Description</InputLabel>
                <TextField
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <InputLabel sx={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>Image URL</InputLabel>
                <TextField
                  name="image"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ marginBottom: '24px' }}
                />
                <Button onClick={handleSubmit} type="submit" color="primary" variant="contained">
                  SUBMIT
                </Button>
              </Box>
            </Modal>

          </div>
        ))
      ) : (
        <h1>No blogs created yet</h1>
      )}
    </>
  );
}

export default UserBlogs;
