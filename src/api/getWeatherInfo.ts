export interface IWeatherInfo {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export const getWeatherInfo = async () => {
  const myPosition = {
    lat: 0,
    lon: 0,
  }

  await new Promise<void>((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      myPosition.lat = position.coords.latitude
      myPosition.lon = position.coords.longitude
      resolve()
    })
  })

  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${myPosition.lat}&lon=${myPosition.lon}&appid=658d847ef1d28e72e047ab0c5a476d54&units=metric`)
  return data.json()
}