const express = require("express");
const dbConnect = require("./config/db");
const cors = require("cors");
const verifyToken = require("./middlewares/verifyToken");
const verifyAPIkey = require("./middlewares/verifyAPIkey");
const { deleteUserDeletedData } = require("./controllers/userDataController");
const { deleteProductData } = require("./controllers/deleteProductData");
const http = require("http");
const { Server } = require("socket.io"); 
require("dotenv").config();

const server = express();
const httpServer = http.createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:8000"],
    methods: ["GET", "POST"],
  },
});

dbConnect();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cors({
  origin: ["http://localhost:5173", "http://localhost:8000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

server.delete("/api/deleteUserData", verifyAPIkey, deleteUserDeletedData);
server.delete("/api/deleteProductData", verifyAPIkey, deleteProductData);

server.use(verifyToken);
server.use("/api/comments", require("./routes/commentRoutes"));
server.use("/api/notifications", require("./routes/notificationRoutes"));
server.use("/api/likes", require("./routes/likeRoutes"));
server.use("/api/conversations", require("./routes/conversationRoutes"));
server.use("/api/messages", require("./routes/messageRoutes"));

io.on("connection", (socket) => {
    socket.on("joinConversation", ({ selectedConversation, userId }) => {
        socket.join(selectedConversation);
        console.log(`User ${userId} joined conversation: ${selectedConversation}`);
    
        socket.to(selectedConversation).emit("userOnline", { userId });
    });

  socket.on("sendMessage", (data) => {
    io.to(data.selectedConversation).emit("newMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.set("io", io);

httpServer.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});
