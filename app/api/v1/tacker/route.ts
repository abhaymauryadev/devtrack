import { NextRequest, NextResponse } from "next/server";
import {
  startSessionController,
  stopSessionController,
} from "@/controllers/tracker.controller";

export async function POST() {
  const session = await startSessionController();
  return NextResponse.json(session);
}

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json();
    const session = await stopSessionController(id);

    return NextResponse.json(session);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}