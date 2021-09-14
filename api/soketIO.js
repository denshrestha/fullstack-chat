const { Server } = require("socket.io")
const server = require("./app");

server.listen(3001)

const io = new Server(server, {
  allowEIO3: true,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    withCredentials: true,
  }
});
module.exports = io
