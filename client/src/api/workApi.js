import { axiosInstance } from ".";

const getPastOrder = async ()=>{
    try{
         const res = await axiosInstance.get('/api/work/get-past-order');
     return res.data;
    }catch(err){
        console.log(err);
    }
}