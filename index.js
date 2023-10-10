// server.js
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const { port, baseurl } = require("./config");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: `${baseurl}`, // Your React app's origin
    methods: ["GET", "POST"],
  },
});

let countOne = 40;
let countTwo = 40;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

io.on("connection", (socket) => {
  console.log(`A user entered on ${port}`);

  socket.emit("updateCountOne", countOne);
  socket.emit("updateCountTwo", countTwo);

  socket.on("incrementOne", () => {
    countOne++;
    io.emit("updateCountOne", countOne);
  });

  socket.on("decrementOne", () => {
    countOne--;
    io.emit("updateCountOne", countOne);
  });

  socket.on("incrementTwo", () => {
    countTwo++;
    io.emit("updateCountTwo", countTwo);
  });

  socket.on("decrementTwo", () => {
    countTwo--;
    io.emit("updateCountTwo", countTwo);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

console.log("base", baseurl);

// Serve the lifecounter page
app.get("/lifecounter", (req, res) => {
  res.render("lifecounter", { countOne, countTwo, baseurl });
});

// Serve the stream page
app.get("/stream", (req, res) => {
  res.render("stream", { countOne, countTwo, baseurl });
});

// Serve client.js
app.get("/client.js", (req, res) => {
  res.sendFile(path.join(__dirname, "client.js"));
});

// Start the server

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
