require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { Server } = require ('socket.io');
const http = require ('http');
const app = express();
const sessionMiddlewares = require('./middlewares/sessionMiddlewares');


const server =http.createServer(app);  // Create an HTTP server using the Express app

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log(`A user connected:`, socket.id);

    socket.on("send_message" , (data)=>{
        console.log('Message from a user ' ,data);
        io.emit('receive_message', data);
    });

  
    socket.on('disconnect', () => {
        console.log(`User disconnected:`, socket.id);
    });
});


app.use(express.json());

app.use(cors({

     origin: 'http://localhost:3000',  

    credentials: true,                
}));


app.use(sessionMiddlewares);


app.use('/auth', authRoutes);


const PORT = 8082;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

