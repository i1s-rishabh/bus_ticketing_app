const express = require('express');
const connectDB = require('./config/db')
const app = express();

app.use(express.json({ extended: false }));

// body parser
connectDB()

const busSearchRoutes = require('./routes/busSearch')
app.use('/api/buses',busSearchRoutes);

const userRoutes = require('./routes/users')
app.use('/api/users',userRoutes);


const adminRoutes = require('./routes/admins')
app.use('/api/admins',adminRoutes)

app.use((req,res,next)=>{
    console.log("next called without anything")
    next()
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json(err)
})

// error handler should be the last middleware with app.use

app.listen(4000,()=>{
    console.log('Server is running')
})

module.exports = app;