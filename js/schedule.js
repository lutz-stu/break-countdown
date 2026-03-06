function getNextTarget(now) {
  if (!SCHEDULE || SCHEDULE.length === 0) {
    return null;
  }

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  for (let t of SCHEDULE) {
    const windowStart = minutesToDate(timeToMinutes(t.windowStart), today);
    const windowEnd = minutesToDate(timeToMinutes(t.windowEnd), today);
    const target = minutesToDate(timeToMinutes(t.target), today);

    if (now >= windowStart && now < windowEnd) {
      return { ...t, target };
    }
  }

  // After 24:00, show first entry of next day
  if (SCHEDULE.length > 0) {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const target = minutesToDate(timeToMinutes(SCHEDULE[0].target), tomorrow);
    return { ...SCHEDULE[0], target };
  }

  return null;
}
