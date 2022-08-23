require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./router/auth')
const userRouter = require('./router/userRouter')
const todoRouter = require('./router/todoRouter')
const app = express()
const corsOptions = {
    origin: "http://103.56.162.78:3000",
credentials: true,
 };
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
//Router
app.use('/i1/auth',authRouter);
app.use('/i1/user',userRouter);
app.use('/td1/list',todoRouter);

const connectdb = async() => {
    try {

        await mongoose.connect('mongodb://localhost:27017/ListToDo1') 
        console.log("Kết nối thành công");  
    } catch (error) {
        console.log("Kết nối thất bại");
    }
}
connectdb();
app.listen(8000,() => {
    console.log(`server run on 8000`);
});



