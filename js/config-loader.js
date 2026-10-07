let SCHEDULE = [];

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Load the alternate schedule only on its explicitly configured dates.
async function loadConfig() {
  try {
    const [configResponse, altConfigResponse] = await Promise.all([
      fetch('config.json', { cache: 'no-store' }),
      fetch('alt_config.json', { cache: 'no-store' })
    ]);
    const config = await configResponse.json();
    const altConfig = await altConfigResponse.json();
    const today = getDateKey(new Date());
    SCHEDULE = altConfig.dates.includes(today)
      ? altConfig.schedule
      : config.schedule;
    updateCountdown(); // Start countdown after config loaded
  } catch (error) {
    console.error('Failed to load schedule configuration:', error);
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
