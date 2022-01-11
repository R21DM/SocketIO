const http = require("http");
const express = require("express");
const app = express();
const socketIO = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);

const PORT = 8000;

app.use(cors());
app.use(express.json());

const io = socketIO(server, {
  allowEIO3: true,
  withCredentials: true,
});
let arrMsg = [];
app.io = io;
app.arrMsg = arrMsg;

app.post("/sendMessage", (req, res) => {
  arrMsg.push(req.body);

  io.emit("chat message", arrMsg);
  res.status(200).send(arrMsg);
});

io.on("connection", (socket) => {
  console.log("User connect");
  socket.on("JoinChat", (data) => {
    console.log("User join: ", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnect");
  });
});

server.listen(PORT, () => {
  console.log("Socket server is running at port:", PORT);
});
