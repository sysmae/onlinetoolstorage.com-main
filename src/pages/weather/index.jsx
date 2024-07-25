import React, { useEffect, useState } from 'react'
import { API_KEY, BASE_URL, fetchData } from '@/lib/weather-services'

import WeatherResult from '@/components/weather/WeatherResult'
import SearchBar from '@/components/weather/SearchBar'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      locale,
    },
  }
}

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [city, setCity] = useState('Seoul')
  const [tempIsLow, setTempIsLow] = useState(false)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    const getWeatherData = async () => {
      if (city.trim().length > 0) {
        setIsloading(true)
        try {
          //Fetch weather data and update the state
          const weather = await fetchData(
            `${BASE_URL}weather?q=${city}&limit=6&appid=${API_KEY}&units=metric`,
          )

          setCurrentWeather(weather)
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message || 'Something went wrong!')
          }
        }
        setIsloading(false)
      }
    }
    getWeatherData()
  }, [city])

  useEffect(() => {
    // Update the background image based on the weather condition
    if (currentWeather) {
      const temp = +currentWeather?.main.temp.toFixed()
      if (temp < 3) {
        setTempIsLow(true)
      } else {
        setTempIsLow(false)
      }
    }
  }, [currentWeather])

  const cardBg = tempIsLow ? 'bg-tempLow' : 'bg-tempHigh'

  // A default content for when no weather data has been found yet.
  let weatherResultContent = <p className="py-5">Loading...</p>
  if (!isLoading && !currentWeather) {
    weatherResultContent = <p className="py-5">Nothing Found!</p>
  }
  if (!isLoading && currentWeather) {
    weatherResultContent = <WeatherResult weatherData={currentWeather} />
  }

  return (
    <div className="weather">
      <SearchBar onCityChange={setCity} />
      {weatherResultContent}
    </div>
  )
}

export default Weather
