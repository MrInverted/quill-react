import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000")

socket.on("connect", () => {
  console.log(socket.connected, socket.id);
  toast.success("Websocket connection established")
});

socket.on("disconnect", () => {
  console.log(socket.connected, socket.id);
  toast.error("Websocket connection closed")
});

socket.on("connect_error", (error) => {
  if (socket.active) {
    console.log("Error, reconnecting...")
    toast.error("Websocket connection error...")
  } else {
    console.log({ connect_error: error });
    toast.error("Websocket connection disrupted")
  }
});

socket.on("success", (msg) => toast.success(msg));
socket.on("error", (msg) => toast.error(msg));

console.log("SOCKET-IO-CLIENT");

export { socket }