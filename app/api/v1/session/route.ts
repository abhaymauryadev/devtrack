import { NextResponse } from "next/server";
import { getSessionsController } from "@/controllers/session.controller";

export async function GET() {
  const sessions = await getSessionsController();
  return NextResponse.json(sessions);
}