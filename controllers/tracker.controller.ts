import { createSession, endSession } from "@/models/session.model";

export const startSessionController = async () => {
  return createSession();
};

export const stopSessionController = async (id: string) => {
  return endSession(id);
};