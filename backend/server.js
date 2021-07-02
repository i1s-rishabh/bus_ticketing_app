const express = require('express');
const connectDB = require('./config/db')
const app = express();

app.use(express.json({ extended: false }));

// body parser
const userRoutes = require('./routes/signup')
connectDB()
app.use('/api/users',userRoutes);

app.use((req,res,next)=>{
    console.log("next called without anything")
    next()
})

app.use((err,req,res,next)=>{
    console.log("from error handler",err)
    if(err.message==="password invalid"){
        return res.status(400).json({"msg":"invalid password"})
    }
})

// error handler should be the last middleware with app.use

app.listen(4000,()=>{
    console.log('Server is running')
})

module.exports = app;