import { getAllSessions, updateSessionMeta } from "@/models/session.model";

export const getSessionsController = async () => {
  return getAllSessions();
};

export const updateSessionMetaController = async (
  id: string,
  tags: string[],
  note: string | null,
) => {
  return updateSessionMeta(id, tags, note);
};