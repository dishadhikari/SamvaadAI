import { randomInt } from "crypto";

type Room = { createdAt: number; participants: number };
const host = globalThis as unknown as { samvaadRooms?: Map<string, Room> };
const rooms = host.samvaadRooms ?? new Map<string, Room>();
host.samvaadRooms = rooms;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body.action === "create") {
    let code = "";
    do code = String(randomInt(100000, 1000000)); while (rooms.has(code));
    rooms.set(code, { createdAt: Date.now(), participants: 1 });
    return Response.json({ code });
  }
  if (body.action === "join" && typeof body.code === "string" && /^\d{6}$/.test(body.code)) {
    const room = rooms.get(body.code);
    if (!room || Date.now() - room.createdAt > 86_400_000) return Response.json({ error: "This meeting code is invalid or has expired." }, { status: 404 });
    if (room.participants >= 2) return Response.json({ error: "This room already has two participants." }, { status: 409 });
    room.participants += 1;
    return Response.json({ code: body.code });
  }
  return Response.json({ error: "Invalid request." }, { status: 400 });
}
