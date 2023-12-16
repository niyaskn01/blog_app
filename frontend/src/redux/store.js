import { createSlice,configureStore } from "@reduxjs/toolkit";

const initialState={
  isLogin:false
}

const authSlice=createSlice({
  name:'auth',
  initialState,
  reducers:{
    login:(state)=>{
      state.isLogin=true
    },
    logout:(state)=>{
      state.isLogin=false
    }
  }
})

export const authActions=authSlice.actions

export const store=configureStore({
  reducer:authSlice.reducer
})
