import Setting from "./Setting/Setting"
import WeatherInfo from "./WeatherInfo/WeatherInfo"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 flex items-center justify-between w-full h-14 pr-3 z-30">
      <WeatherInfo />
      <Setting />
    </header>
  )
}