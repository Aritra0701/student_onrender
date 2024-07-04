import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper";
import { toast } from "react-toastify";
export const STATUS=Object.freeze({
    LOADING:"loading",
    IDLE:"idle"
})
export const productApi=createAsyncThunk("/product",async()=>{
    let response=await axiosInstance.get("/product")
    return response.data.data

})
export const deleteApi=createAsyncThunk("/delete/product/",async(id)=>{
    let response=await axiosInstance.delete(`/delete/product/${id}`)
    return response.data
})
export const createApi=createAsyncThunk("/create/product",async(data)=>{
    let response=await axiosInstance.post("/create/product",data)
    return response.data
})
export const updateApi=createAsyncThunk("/update/product",async({payload,id})=>{
    let response=await axiosInstance.post(`/update/product/${id}`,payload)
    return response.data
})
export const singleApi=createAsyncThunk("/edit/product",async(id)=>{
    let response=await axiosInstance.get(`/edit/product/${id}`)
    return response.data.data
})
const productSlice=createSlice({
    name:"product",
    initialState:{
        status:STATUS.IDLE,
        pdata:[],
        sdata:[]

    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(productApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(productApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE
            state.pdata=payload
        })
        .addCase(productApi.rejected,(state)=>{
            state.status=STATUS.IDLE
        })
        .addCase(deleteApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(deleteApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE
            if (payload.status===true) {
                toast.success(payload.message)
                
            }
        })
        .addCase(deleteApi.rejected,(state)=>{
            state.status=STATUS.IDLE
        })
        .addCase(createApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(createApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE
            if (payload.status===true) {
                toast.success(payload.message)
                
            }
        })
        .addCase(createApi.rejected,(state)=>{
            state.status=STATUS.IDLE
            toast.error("error in create product...")
        })
        .addCase(updateApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(updateApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE
            if (payload.status===true) {
                toast.success(payload.message)
                
            }
        })
        .addCase(updateApi.rejected,(state)=>{
            state.status=STATUS.IDLE
            toast.error("error in Update")
        })
        .addCase(singleApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(singleApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE
            state.sdata=payload
        })
        .addCase(singleApi.rejected,(state)=>{
            state.status=STATUS.IDLE
        })
    }
})

export default productSlice.reducer