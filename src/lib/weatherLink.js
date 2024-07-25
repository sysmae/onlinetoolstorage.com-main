export function getWeatherLink({ lat, lon }) {
  const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  if (!weatherApiKey) {
    console.error('API key가 없습니다.')
    return null
  }

  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`
}
