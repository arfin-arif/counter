// server.js
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}`, // Your React app's origin
    methods: ["GET", "POST"],
  },
});

let countOne = 40;
let countTwo = 40;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

io.on("connection", (socket) => {
  console.log("A client connected");

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

// Serve the lifecounter page
app.get("/lifecounter", (req, res) => {
  res.render("lifecounter", { countOne, countTwo });
});

// Serve the stream page
app.get("/stream", (req, res) => {
  res.render("stream", { countOne, countTwo });
});

// Serve client.js
app.get("/client.js", (req, res) => {
  res.sendFile(path.join(__dirname, "client.js"));
});

// Start the server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
