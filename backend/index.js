require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/AuthRouter');
const orderRouter = require('./Routes/OrderRouter');
const http = require('http');
const { Server } = require('socket.io');
const app = express();


const messageRoutes = require('./Routes/messageRoutes');
const noticeRoutes = require('./Routes/noticeRoutes');
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both origins
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

app.use(cors({ origin: 'http://localhost:3000' }));  // Adjust origin as needed


// Socket.io connection
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('sendNotice', (notice) => {
        io.emit('newNotice', notice); // Broadcast new notice to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// Configure CORS options
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Enable credentials for cross-origin requests
};

app.use(cors(corsOptions));


server.listen(5000, () => {
    console.log('Socket.io server running on port 5000');
});
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));
// Notice and message models
const Notice = require('./Models/Notice');
const Message = require('./Models/Message');

app.use('/messages', messageRoutes);
app.use('/notices', noticeRoutes); // This assumes the route file is located in the 'routes' folder


// Routes
app.use(express.json());
app.use('/auth', authRouter);
app.use('/api', orderRouter);
// Routes
app.use('/messages', messageRoutes);
app.use('/notices', noticeRoutes);


 
app.use('/api/notices', require('./Routes/noticeRoutes'));
app.use('/api/messages', require('./Routes/messageRoutes'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
