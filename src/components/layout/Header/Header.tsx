import DateInfo from "./DateInfo/DateInfo"
import Setting from "./Setting/Setting"
import WeatherInfo from "./WeatherInfo/WeatherInfo"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 flex items-center justify-between w-full h-14 px-3 z-30">
      <WeatherInfo />
      <div className="flex gap-5">
        <DateInfo />
        <Setting />
      </div>
    </header>
  )
}