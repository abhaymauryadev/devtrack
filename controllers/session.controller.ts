import { getAllSessions } from "@/models/session.model";

export const getSessionsController = async () => {
  return getAllSessions();
};