import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethod";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";

export const login = async (dispatach, user)=>{
    dispatach(loginStart());
    try{
        const res = await publicRequest.post("/user/login", user)
        dispatach(loginSuccess(res.data.user))
    }catch(err){
        // console.log(err.response.data)
        dispatach(loginFailure(err.response.data))
    }
}

export const getProducts = async (dispatach)=>{
    dispatach(getProductStart());
    try{
        const res = await publicRequest.get("/product/all")
        dispatach(getProductSuccess(res.data))
    }catch(err){
        // console.log(err.response.data)
        dispatach(getProductFailure(err.response.data))
    }
}

export const deleteProduct = async (id, dispatach)=>{
    dispatach(deleteProductStart());
    try{
        const res = await userRequest.delete(`/product/delete/${id}`)
        dispatach(deleteProductSuccess(res.data))
    }catch(err){
        console.log(err)
        dispatach(deleteProductFailure(err.response.data))
    }
}

export const updateProduct = async (product, id, dispatach)=>{
    dispatach(updateProductStart());
    try{
        const res = await userRequest.put(`/product/update/${id}`, product)
        // console.log(product, id)
        dispatach(updateProductSuccess(res.data.product))
    }catch(err){
        console.log(err)
        dispatach(updateProductFailure(err.response.data))
    }
}

export const addProduct = async (product, dispatach)=>{
    dispatach(addProductStart());
    try{
        const res = await userRequest.post(`/product/add`, product)
        console.log(res.data)
        dispatach(addProductSuccess(res.data.product))
    }catch(err){
        console.log(err)
        dispatach(addProductFailure(err.response.data))
    }
}

export const register = async (dispatach, user) =>{
    dispatach(loginStart());
    try{
        const res = await publicRequest.post("/user/register", user)
        dispatach(loginSuccess(res.data))
    }catch(err){
        dispatach(loginFailure(err.response.data))
    }
}

export const logout = async (dispatach) =>{
    try{
        await userRequest.get('/user/logout');
        dispatach(logoutUser());
    }catch(err){
        console.log(err);
    }
}