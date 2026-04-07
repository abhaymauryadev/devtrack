import { getAllSessions } from "@/models/session.model";

export async function GET() {
  const sessions = await getAllSessions(); // from DB
  return Response.json(sessions);
}