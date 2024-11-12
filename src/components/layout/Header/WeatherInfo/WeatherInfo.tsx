'use client'

import { getWeatherInfo, IWeatherInfo } from "@/api/getWeatherInfo"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function WeatherInfo() {
  const [weatherInfo, setWeatherInfo] = useState<IWeatherInfo | null>(null)

  console.log(weatherInfo)

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherInfo()
      setWeatherInfo(data)
    }
    fetchWeather()
  }, [])
  
  return (
    <article>
      {weatherInfo !== null ? (
        <div className="flex items-center">
          <Image 
            src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
            alt={weatherInfo.weather[0].description}
            width={56}
            height={56}
          />
          <p className="mr-2">{weatherInfo.name}</p>
          <p>{weatherInfo.main.temp}</p>
        </div>
      ) : (
        <p className="after:content-['.'] after:inline-block after:animate-[dots_1.5s_steps(4,end)_infinite] after:w-5">
          Weather Loading
        </p>
      )}
    </article>
  )
}