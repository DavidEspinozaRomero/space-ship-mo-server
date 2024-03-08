const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const createBtn = document.getElementById("create");
const joinBtn = document.getElementById("join");

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("create room", "SpaceShip");
});

joinBtn.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("join room");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("connect", () => {
  console.log('conected');
})

socket.on("chat message", (args) => {
  const [msg] = args;
  console.log(args);
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
