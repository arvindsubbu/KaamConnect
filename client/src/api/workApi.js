import { axiosInstance } from ".";

const getOrder = async (query)=>{
    try{
         const res = await axiosInstance.get(`/api/orders?status=${query}`);
     return res.data;
    }catch(err){
        console.log(err);
    }
}

export {getOrder};