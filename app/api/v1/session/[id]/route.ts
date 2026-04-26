import { NextRequest, NextResponse } from "next/server";
import { updateSessionMetaController } from "@/controllers/session.controller";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { tags, note } = await req.json();
    const session = await updateSessionMetaController(
      id,
      Array.isArray(tags) ? tags : [],
      note ?? null,
    );
    return NextResponse.json(session);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
