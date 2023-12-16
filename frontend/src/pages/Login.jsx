import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast'

function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleSubmit=async()=>{
    const userData={email,password}
    try {
      const {data}=await axios.post('/user/login',userData)
     if(data.success){
      dispatch(authActions.login())
      localStorage.setItem('userID',data?.user?._id)
      navigate('/')
      toast.success(data.message)
     }else{
      toast.error(data.message)
     }
    } catch (error) {
      console.log(error);
      toast.error('error in login')
    }
  }
  return (
    <>
      <Box maxWidth={450} display='flex' flexDirection='column'
        alignItems='center'
        justifyContent='center'
        margin='auto'
        marginTop={2}
        borderRadius={5}
        padding={2}
        boxShadow='10px 10px 20px #ccc' >
        <Typography variant='h4'
          textAlign='center'
          padding={2}
        >Register</Typography>
        <TextField 
          onChange={(e)=>setEmail(e.target.value)}
          label='email' 
          margin='normal'
          type='text' 
          required />
        <TextField 
          onChange={(e)=>setPassword(e.target.value)}
          label='password' 
          margin='normal'
          type='password' 
          required />
        <Button
          onClick={handleSubmit}
          type='submit'
          variant='contained'
          color='primary'
          sx={{borderRadius:2 ,margin:2}}
        >Submit</Button>
        <Button
          onClick={()=>navigate('/register')}
          type='submit'
          color='primary'
          sx={{borderRadius:2}}>Not a user ? SignUp</Button>
      </Box>
    </>
  )
}

export default Login