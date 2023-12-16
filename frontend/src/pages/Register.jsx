import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from  'react-hot-toast'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/store'

function Register() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const userData={name,email,password}
    try {
       const {data}=await axios.post('/user/register',userData)
       console.log(data);
       if(data.success){
        localStorage.setItem('userID',data?.user?._id)
        navigate('/')
        toast.success(data.message)
        dispatch(authActions.login())
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      console.log(error);
      toast.error('error in server')
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
          onChange={(e)=>setName(e.target.value)}
          label='name' 
          margin='normal'
          type='text' 
          required />
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
          onClick={()=>navigate('/login')}
          type='submit'
          color='primary'
          sx={{borderRadius:2}}>Already registered ? Please login</Button>
      </Box>
    </>
  )
}

export default Register