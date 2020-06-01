const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const userRouter = require("./router");

const { getUser, getUsersInRoom, addUser, removeUser } = require("./users");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(userRouter);

io.on("connection", (socket) => {
  console.log("socket connected successfully!");
  socket.on("join", ({userId, username, room }, callback) => {
    // console.log(`user ${username} joined ${room} room!`);
    const { user, error } = addUser({ userId, id: socket.id, username, room });

    if (error) return callback(error);

    if (user) {
      socket.join(user.room);
    }

    // socket.emit("message", {
    //   user: "notification",
    //   text: `${user.username} joined ${user.room}`,
    // });
    // socket.broadcast.to(user.room).emit("message", {
    //   user: "notification",
    //   text: `${user.username} has joined ${user.room}`,
    // });

    // io.to(user.room).emit("roomInfo", {
    //   room: user.room,
    //   users: getUsersInRoom(user.room),
    // });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: { userId: user.userId, id: user.id, username: user.username },
      text: message,
      timestamps: new Date(),
    });

    callback();
  });

  socket.on("typing", ({ completed }) => {
    const user = getUser(socket.id);
    socket.broadcast
      .to(user.room)
      .emit("type", { user: user.username, completed });
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected!");
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "notification",
        text: `User ${user.username} has left the room`,
      });
      io.to(user.room).emit("roomInfo", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
