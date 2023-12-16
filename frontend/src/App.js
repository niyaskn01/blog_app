import './App.css';
import Header from './components/Header';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import CreateBlogs from './pages/CreateBlogs';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function App() {
  const isLogin=useSelector(state=>state.isLogin)
  const navigate=useNavigate()
  useEffect(() => {
    
    if (!isLogin) {
      navigate('/login');
     
    }
  }, []);
  return (
    <>
      <Header/>
      <Routes>
        {
          isLogin &&
          <>
            <Route path='/' element={<Blog/>}/>
            <Route path='/blogs' element={<Blog/>}/>
            <Route path='/my-blogs' element={<UserBlogs/>}/>
            <Route path='/create-blogs' element={<CreateBlogs/>}/>
          </>
        }
        
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
