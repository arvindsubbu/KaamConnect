import { axiosInstance } from ".";

const signUpUser = async (values)=>{
    try{
        const res = await axiosInstance.post('/api/user/signup',values);
        return res.data;
    }catch(err){
        console.log(err);
    }
}

const loginUser = async (values)=>{
    try{
        const response = await axiosInstance.post('/api/user/login',values);
        //console.log('userApi',response);
        
        return response.data;
    }catch(err){
        console.log(err);
    }
}

const getCurrentUser = async ()=>{
    try{
        const response = await axiosInstance.get('/api/user/get-current-user');
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export {signUpUser,loginUser,getCurrentUser};