'use client'

import { getWeatherInfo, IWeatherInfo } from "@/api/getWeatherInfo"
import { useWeatherStore } from "@/store/useSettingStore"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function WeatherInfo() {
  const { weatherSetting } = useWeatherStore()
  const [weatherInfo, setWeatherInfo] = useState<IWeatherInfo | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherInfo()
      setWeatherInfo(data)
    }
    fetchWeather()

    const interval = setInterval(() => {
    fetchWeather()
    }, 60000)

    return () => clearInterval(interval)
  }, [])
  
  return (
    <article>
      {weatherInfo !== null ? (
        <div className="flex items-center pr-4 rounded-xl text-lg">
          {weatherSetting.isIcon && (
            <Image 
              src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
              alt={weatherInfo.weather[0].description}
              width={48}
              height={48}
            />
          )}
          {weatherSetting.isLocation && (
            <p className="mr-2">{weatherInfo.name}</p>
          )}
          {weatherSetting.isTemp && (
            <p>{Math.round(weatherInfo.main.temp)}°C</p>
          )}
        </div>
      ) : (
        <p className="after:content-['.'] after:inline-block after:animate-[dots_1.5s_steps(4,end)_infinite] after:w-5">
          Weather Loading
        </p>
      )}
    </article>
  )
}