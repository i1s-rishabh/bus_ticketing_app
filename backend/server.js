const express = require('express');
const connectDB = require('./config/db')
const app = express();

app.use(express.json({ extended: false }));

connectDB()
app.use('/api/users', require('./routes/signup'));

// app.listen(4000,()=>{
//     console.log('Server is running')
// })

module.exports = app;