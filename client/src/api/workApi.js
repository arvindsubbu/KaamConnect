import { axiosInstance } from ".";

const getOrder = async (status,page,limit)=>{
    try{
         const res = await axiosInstance.get(`/api/orders?status=${status}&page=${page}&limit=${limit}`);
     return res.data;
    }catch(err){
        console.log(err);
    }
}

export {getOrder};