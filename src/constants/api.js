export const API_URLS = {
  DISTRICTS: "https://api.ipma.pt/open-data/distrits-islands.json",
  WIND_SPEED: "https://api.ipma.pt/open-data/wind-speed-daily-classe.json",
  PRECIPITATION: "https://api.ipma.pt/open-data/precipitation-classe.json",
  WEATHER_TYPES: "https://api.ipma.pt/open-data/weather-type-classe.json",
  UV: "https://api.ipma.pt/open-data/forecast/meteorology/uv/uv.json",
  DAILY_FORECAST: (cityId) =>
    `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${cityId}.json`,
};
