// let socket = new WebSocket("ws://localhost:8080");

// socket.onopen = (ev) => {
//   console.log("[open] conexion aceptada");
//   socket.send("NEPOMUCENO WAS HERE");
// };

// let msg = document.getElementById('btn').addEventListener('click', () => {
//   console.log(document.getElementById('txt').value);
// });

// socket.onmessage = (event) => {
// console.log("[message] datos recibidos. " + msg);//event.data);
// };

const socket = new WebSocket('ws://localhost:8081');

function connect() {
  const usernameInput = document.getElementById('usernameInput');
  const connectButton = document.getElementById('connectButton');

  const username = usernameInput.value;
  if (username) {
const socket = new WebSocket('ws://localhost:8081');
    socket.onopen = function(event) {
      socket.send(JSON.stringify({
        type: 'username',
        username: username
      }));

      usernameInput.disabled = true;
      connectButton.disabled = true;
      document.getElementById('messageInput').disabled = false;
      document.getElementById('sendButton').disabled = false;
    };

    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'message':
          const chatBox = document.getElementById('chatBox');
          const message = `[${data.time}] ${data.sender}: ${data.message}`;
          chatBox.innerHTML += message + '<br>';
          chatBox.scrollTop = chatBox.scrollHeight;
          break;
      }
    };
  }
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;

  if (message) {
    socket.send(JSON.stringify({
      type: 'message',
      message: message
    }));

    messageInput.value = '';
  }
}