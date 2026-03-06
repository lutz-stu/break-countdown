let SCHEDULE = [];

// Load config.json on page load
async function loadConfig() {
  try {
    const response = await fetch('config.json');
    const data = await response.json();
    SCHEDULE = data.schedule;
    updateCountdown(); // Start countdown after config loaded
  } catch (error) {
    console.error('Failed to load config.json:', error);
    document.getElementById('info').textContent = 'Error loading config';
    document.getElementById('countdown').textContent = '---';
  }
}

// Parse time string like "08:05" or "next-day:08:05" to minutes since midnight
function timeToMinutes(timeStr) {
  if (timeStr.startsWith('next-day:')) {
    return (24 * 60) + timeToMinutes(timeStr.replace('next-day:', ''));
  }
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

// Convert minutes to Date object for today
function minutesToDate(minutes, baseDate) {
  const date = new Date(baseDate);
  date.setHours(0, 0, 0, 0);
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}
