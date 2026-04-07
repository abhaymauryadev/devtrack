type Session = {
  date: string;
};

export const calculateStreak = (sessions: Session[] = []): number => {
  if (!sessions.length) return 0;

  const uniqueDates = Array.from(
    new Set(
      sessions.map((session) =>
        new Date(session.date).toISOString().split("T")[0],
      ),
    ),
  ).sort((a, b) => b.localeCompare(a));

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const dateString of uniqueDates) {
    const sessionDate = new Date(dateString);
    sessionDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round(
      (currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0 || diffDays === 1) {
      streak++;
      currentDate = sessionDate;
    } else {
      break;
    }
  }

  return streak;
};