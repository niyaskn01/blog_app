import React, { useState } from 'react'
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Toaster} from 'react-hot-toast'
import { authActions } from '../redux/store'

function Header() {
  //global state
  const isLogin=useSelector(state=>state.isLogin)
  const [value,setValue]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogout=()=>{
    dispatch(authActions.logout())
    navigate('/login')
  }
  return (
    <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h4'>
            MY Blog App
          </Typography>
          {
            isLogin &&
            <>
              <Box display={'flex'} marginLeft='auto' marginRight='auto'>
                <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)} >
                  <Tab label='Blogs' LinkComponent={Link} to='/blogs'></Tab>
                  <Tab label='My blogs' LinkComponent={Link} to='/my-blogs'></Tab>
                  <Tab label='Create blogs' LinkComponent={Link} to='/create-blogs'></Tab>
                </Tabs>
              </Box>
            </>
          }
          
          <Box display='flex' marginLeft='auto' >
            {
              !isLogin ? 
              <>
                <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to='/login' >Login</Button>
                <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to='/register' >Register</Button>
              </>
              :
              <>
                <Button
                 onClick={handleLogout}
                 sx={{margin:1,color:'white'}} >Logout</Button>
              </>
            }
            
          </Box>
        </Toolbar>
        <Toaster/>
      </AppBar>
  )
}

export default Header