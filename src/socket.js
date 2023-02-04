const jwt = localStorage.getItem("token");
const socket = new WebSocket(new URL(`ws://127.0.0.1:4000/ws?token=${jwt}`));

export const connect = (onMessage, onError, onClose) => {
  socket.onopen = (evt) => {
    console.log("socket successfully opened");
    console.log(evt);
  };
  socket.onmessage = (evt) => {
    console.log("a message arrived through socket");
    onMessage(JSON.parse(evt.data));
  };
  socket.onclose = (evt) => {
    console.log("socket closed");
    onClose && onClose(evt);
    console.log(evt);
  };
  socket.onerror = (evt) => {
    console.log("socket error occurred");
    onError && onError(evt);
    console.log(evt);
  };
};

export const sendMsg = (msg) => {
  console.log("sending message through socket");
  socket.send(JSON.stringify(msg));
};

export const close = () => {
  socket.close(1000);
};
