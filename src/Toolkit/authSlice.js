import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper";
import { toast } from "react-toastify";

export const STATUS = Object.freeze({
  LOADING: "loading",
  IDLE: "idle",
  
  
});
export const registration = createAsyncThunk("/register", async (data) => {
  let response = await axiosInstance.post("/register", data);
  return response.data;
});
export const LoginApi=createAsyncThunk("/login",async(data)=>{
    let response=await axiosInstance.post("/login",data)
    return response.data
})
export const forgotApi=createAsyncThunk("/forget-password",async(data)=>{
    let response=await axiosInstance.post("/forget-password",data)
    return response.data
})
export const updatePasswordApi=createAsyncThunk("/update-password",async(data)=>{
    let response=await axiosInstance.post("/update-password",data)
    return response.data
})
export const homeApi=createAsyncThunk("/user/dashboard",async()=>{
    let response=await axiosInstance.get("/user/dashboard")
    return response.data.data
})
const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: STATUS.IDLE,
    isLogin:false,
    home:[],
    isRedirectToo:null,


  },
  reducers: {
    removeToken:(state)=>{
        localStorage.removeItem("token");
        localStorage.removeItem("image")
        localStorage.removeItem("user_id")
        localStorage.removeItem("password")
        state.isLogin=false

    },
    checkToken:(state,{payload})=>{
     const token=localStorage.getItem("token")
     if (token) {
        state.isLogin=true
        
     }
    },
    redirect:(state,{payload})=>{
        state.isRedirectToo=payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginApi.pending,(state)=>{
        state.status=STATUS.LOADING
      })
      .addCase(LoginApi.fulfilled,(state,{payload})=>{
        state.status=STATUS.IDLE
        if (payload.status===true) {
            toast.success(payload.message)
            state.isLogin=true
            state.isRedirectToo="/Home"
            localStorage.setItem("token",payload.token)
            localStorage.setItem("image",payload.image)
            localStorage.setItem("user_id",payload.user._id)

            
        }
        if (payload.status===false) {
            toast.error(payload.message)
            
        }
      })
      .addCase(LoginApi.rejected,(state)=>{
        state.status=STATUS.IDLE
        toast.error("Error in Login")
      })
      .addCase(registration.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        if (action.payload.status === true) {
          toast.success(action.payload.message);
          
        }
        if (action.payload.success === false) {
          toast.error(action.payload.message);
        }
      })
      .addCase(registration.rejected, (state) => {
        state.status = STATUS.IDLE;
        toast.error("Registration Error")
      })
      .addCase(forgotApi.pending,(state)=>{
        state.status=STATUS.LOADING
      })
      .addCase(forgotApi.fulfilled,(state,{payload})=>{
        state.status=STATUS.IDLE
        if (payload.success===true) {
            toast.success(payload.message)
            
        }
      })
      .addCase(forgotApi.rejected,(state)=>{
        state.status=STATUS.IDLE;
        toast.error("error....")
      })
      .addCase(updatePasswordApi.pending,(state)=>{
        state.status=STATUS.LOADING
      })
      .addCase(updatePasswordApi.fulfilled,(state,{payload})=>{
        state.status=STATUS.IDLE
        if (payload.success===true) {
            toast.success(payload.msg)
            localStorage.setItem("password",payload.msg)
            state.isRedirectToo="/"
            
        }
      })
      .addCase(updatePasswordApi.rejected,(state)=>{
        state.status=STATUS.IDLE
        toast.error("update password error..")
      })
      .addCase(homeApi.pending,(state)=>{
        state.status=STATUS.LOADING
      })
      .addCase(homeApi.fulfilled,(state,{payload})=>{
        state.status=STATUS.IDLE
        state.home=payload
      })
      .addCase(homeApi.rejected,(state)=>{
        state.status=STATUS.IDLE
      })
    
  },
});
export const {removeToken,checkToken,redirect}=authSlice.actions
export default authSlice.reducer;
