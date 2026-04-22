import { prisma } from "@/lib/db";

export const createSession = async () => {
  return prisma.session.create({
    data: {
      startTime: new Date(),
    },
  });
};

export const endSession = async (id: string) => {
  const session = await prisma.session.findUnique({
    where: { id },
  });

  if (!session) throw new Error("Session not found");

  const endTime = new Date();
  const duration = Math.floor(
    (endTime.getTime() - session.startTime.getTime()) / 1000
  );

  return prisma.session.update({
    where: { id },
    data: { endTime, duration },
  });
};

export const getAllSessions = async () => {
  return prisma.session.findMany({
    where: { endTime: { not: null } },
    orderBy: { createdAt: "desc" },
  });
};