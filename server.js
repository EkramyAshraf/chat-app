const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
app.get("/", (req, res) => {
  res.send("server is running");
});

//connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.log(err);
  });

//Socket.io basic connection
io.on("connection", (socket) => {
  console.log("New WS connection: ", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
