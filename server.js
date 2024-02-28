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
const User=require('./models/userModel')

app.use('/',userRoute)


const io = require('socket.io')(http);
var usp = io.of('/user-namespace');
usp.on('connection', async function(socket){
console.log('User Connected');
var userID = socket.handshake.auth.token
await User.findByIdAndUpdate({ _id: userID }, { $set:{ is_online:'1' } });

socket.on('disconnect', async function(){
 console.log('user Disconnected');
 var userID = socket.handshake.auth.token
await User.findByIdAndUpdate({ _id: userID }, { $set:{ is_online:'0' } });

});
});


http.listen(port, function(){
console.log(`Server is runnig in port: ${port}`)});

