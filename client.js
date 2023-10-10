const socket = io(baseurl, {
  withCredentials: true,
});

// Select the DOM elements to update
const countOneElement = document.getElementById("countOne");
const countTwoElement = document.getElementById("countTwo");

function updateCountOne(count) {
  countOneElement.innerText = count;
}

function updateCountTwo(count) {
  countTwoElement.innerText = count;
}

function incrementOne() {
  socket.emit("incrementOne");
}

function decrementOne() {
  socket.emit("decrementOne");
}

function incrementTwo() {
  socket.emit("incrementTwo");
}

function decrementTwo() {
  socket.emit("decrementTwo");
}

socket.on("updateCountOne", (count) => {
  updateCountOne(count);
});

socket.on("updateCountTwo", (count) => {
  updateCountTwo(count);
});
