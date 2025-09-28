const mongoose = require('mongoose');

const dbUrl = process.env.MONGO_URI;
console.log(dbUrl);

const connectDb = async ()=>{
    try{
        await mongoose.connect(dbUrl);
        console.log('connected to the DataBase');
        
    }catch(err){
        console.error(err.message);
    }
}

module.exports = connectDb;