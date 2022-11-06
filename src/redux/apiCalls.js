import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethod";

export const login = async (dispatach, user)=>{
    dispatach(loginStart());
    try{
        const res = await publicRequest.post("/user/login", user)
        dispatach(loginSuccess(res.data))
    }catch(err){
        // console.log(err.response.data)
        dispatach(loginFailure(err.response.data))
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