require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const userRouter = require('./router/userRouter');
const peopleRouter = require('./router/peopleRouter');
const postRouter = require('./router/postRouter');
const messageRouter = require('./router/messageRouter');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require('cors');
const socket = require('socket.io');
const path = require('path');

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/uploads', express.static('uploads'))
server.use('/api/v1/', userRouter.router);
server.use('/api/v1/', peopleRouter.router);
server.use('/api/v1/', postRouter.router);
server.use('/api/v1/', messageRouter.router);
server.set("view engine", "ejs");

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../frontend/build')));
server.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connected');
}

// Create an http.Server instance using the Express server
const httpServer = http.createServer(server);

// Attach socket.io to the http.Server instance
const io = socket(httpServer, {
    cors: {
        origin: 'https://metaverse-zpva.onrender.com',
        credentials: true
    }
});

global.onlineUsers = new Map();

// connection
io.on('connection', (socket) => {
    global.chatSocket = socket;
    //login user id stored
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    // recieve msg
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
        }
    });
});

// Use the httpServer to listen
httpServer.listen(process.env.PORT, () => {
    console.log('Server started');
});
