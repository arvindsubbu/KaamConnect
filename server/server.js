const express = require('express')
const app = express()
require('dotenv').config();

const connectDb = require('./Config/db');
const userRouter = require('./Routes/userRoutes');
const workRouter = require('./Routes/workRoutes');
const providerRouter = require('./Routes/providerRoutes');
connectDb();
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/orders', workRouter);
app.use('/api/providers',providerRouter);



app.listen(5000,()=>{
    console.log('server is listening at port 5000');
})