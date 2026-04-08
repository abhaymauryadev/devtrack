type Session = {
  startTime: string; // from backend
};

export const calculateStreak = (sessions: Session[] = []): number => {
  if (!sessions.length) return 0;

  //  Step 1: Convert to YYYY-MM-DD (day only)
  const days = sessions
    .map((s) => {
      const d = new Date(s.startTime);

      if (isNaN(d.getTime())) return null;

      return d.toISOString().split("T")[0];
    })
    .filter(Boolean);

  //  Step 2: Unique days only
  const uniqueDays = [...new Set(days as string[])].sort((a, b) =>
    b.localeCompare(a)
  );

  let streak = 0;

  // Step 3: Start from today
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (const day of uniqueDays) {
    const sessionDate = new Date(day);
    sessionDate.setHours(0, 0, 0, 0);

    const diff =
      (current.getTime() - sessionDate.getTime()) /
      (1000 * 60 * 60 * 24);

    //  Only count if today or yesterday
    if (diff === 0 || diff === 1) {
      streak++;
      current = sessionDate;
    } else {
      break;
    }
  }

  return streak;
};