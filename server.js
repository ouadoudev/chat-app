const express = require('express')

const mongoose = require('mongoose')


require('dotenv').config()

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/chat')


const app = require('express')();

app.set('view engine', 'ejs');
app.set( 'views', __dirname + '/views' )
const http = require('http').Server(app); 

const userRoute=require('./routes/userRoute')

app.use('/',userRoute)


http.listen(port, function(){
console.log(`Server is runnig in port: ${port}`)});

