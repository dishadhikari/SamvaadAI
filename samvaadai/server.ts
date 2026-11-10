import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => handle(req, res));
  const io = new Server(httpServer, { path: "/socket.io", cors: { origin: true, methods: ["GET", "POST"] } });

  io.on("connection", (socket) => {
    socket.on("join-room", ({ room, name }: { room: string; name: string }) => {
      if (!/^\d{6}$/.test(room)) return socket.emit("room-error", "Invalid meeting code.");
      const peers = io.sockets.adapter.rooms.get(room);
      if (peers && peers.size >= 2) return socket.emit("room-error", "This room already has two participants.");
      socket.join(room);
      socket.data.room = room;
      socket.data.name = String(name || "Participant").slice(0, 40);
      const size = io.sockets.adapter.rooms.get(room)?.size ?? 1;
      socket.emit("room-ready", { initiator: size === 1 });
      if (size === 2) socket.to(room).emit("peer-joined", { name: socket.data.name });
    });
    socket.on("offer", ({ room, offer }) => socket.to(room).emit("offer", { offer, name: socket.data.name }));
    socket.on("answer", ({ room, answer }) => socket.to(room).emit("answer", { answer }));
    socket.on("ice-candidate", ({ room, candidate }) => socket.to(room).emit("ice-candidate", { candidate }));
    socket.on("approved-message", ({ room, message }) => socket.to(room).emit("approved-message", { message }));
    socket.on("delivery-status", ({ room, id, status }) => socket.to(room).emit("delivery-status", { id, status }));
    socket.on("disconnecting", () => { if (socket.data.room) socket.to(socket.data.room).emit("peer-left"); });
  });
  httpServer.listen(port, "0.0.0.0", () => console.log(`> SamvaadAI running on port ${port}`));
});
