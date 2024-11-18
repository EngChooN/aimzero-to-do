'use client'

// import { bgColorPalette } from "@/constants/bgColorPalette"
import { useOutSideClick } from "@/hooks/useOutSideClick"
import { useEffect, useRef, useState } from "react"
import { IoSettingsSharp } from "react-icons/io5"
import SettingContentWrapper from "./SettingContentWrapper/SettingContentWrapper"
import Toggle from "@/components/common/Toggle"
import { useDateTimeStore, useWeatherStore } from "@/store/useSettingStore"

export default function Setting() {
  const { dateTimeSetting, updateDateTimeSetting } = useDateTimeStore()
  const { weatherSetting, updateWeatherSetting } = useWeatherStore()
  const [isSetting, setIsSetting] = useState(false)
  const settingRef = useRef<HTMLDivElement>(null)
  const bgColorPalette = [
  {
    color: 'default',
    label: 'default',
  },
  {
    color: 'bg-red-500',
    label: 'red',
  },
  {
    color: 'bg-orange-500',
    label: 'orange',
  },
  {
    color: 'bg-yellow-500',
    label: 'yellow',
  },
  {
    color: 'bg-green-500',
    label: 'green',
  },
  {
    color: 'bg-blue-500',
    label: 'blue',
  },
  {
    color: 'bg-indigo-500',
    label: 'indigo',
  },
  {
    color: 'bg-purple-500',
    label: 'purple',
  },
]

  const setBgColor = (color: string) => {
    localStorage.setItem('bg-color', color)
    location.reload()
  }

  useOutSideClick(settingRef, () => setIsSetting(false))

  useEffect(() => {
    if (!localStorage.getItem('bg-color')) {
      localStorage.setItem('bg-color', 'default')
    }
  }, [])

  return (
    <div className="relative" ref={settingRef}>
      <IoSettingsSharp className="text-[28px] cursor-pointer" onClick={() => setIsSetting((prev) => !prev)} />
      {isSetting && (
        <article className="gap-3 absolute p-4 right-0 top-10 flex flex-col max-w-[351px] h-96 shadow-md rounded-3xl backdrop-blur-xl bg-slate-200/40 z-30 overflow-auto no-scrollbar">
          <SettingContentWrapper label="Theme">
            {bgColorPalette.map((color, index) => (
                <div className={`flex-shrink-0 size-8 rounded-full flex justify-center items-center mr-3 ${color.color === 'default' ? 'bg-slate-300' : color.color}`} key={index} onClick={() => setBgColor(color.color)} />
              ))}
          </SettingContentWrapper>
          <SettingContentWrapper label="Date & Time">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <h3>Date</h3>
                <Toggle disabled={false} value={dateTimeSetting.isDate} onClick={() => updateDateTimeSetting({ isDate: !dateTimeSetting.isDate })} />
              </div>
              <div className="flex justify-between items-center">
                <h3>Week Day</h3>
                <Toggle disabled={false} value={dateTimeSetting.isWeekDay} onClick={() => updateDateTimeSetting({ isWeekDay: !dateTimeSetting.isWeekDay })} />
              </div>
              <div className="flex justify-between items-center">
                <h3>Time</h3>
                <Toggle disabled={false} value={dateTimeSetting.isTime} onClick={() => updateDateTimeSetting({ isTime: !dateTimeSetting.isTime })} />
              </div>
            </div>
          </SettingContentWrapper>
          <SettingContentWrapper label="Weather">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <h3>Weather</h3>
                <Toggle disabled={false} value={weatherSetting.isIcon} onClick={() => updateWeatherSetting({ isIcon: !weatherSetting.isIcon })} />
              </div>
              <div className="flex justify-between items-center">
                <h3>Location</h3>
                <Toggle disabled={false} value={weatherSetting.isLocation} onClick={() => updateWeatherSetting({ isLocation: !weatherSetting.isLocation })} />
              </div>
              <div className="flex justify-between items-center">
                <h3>Temp</h3>
                <Toggle disabled={false} value={weatherSetting.isTemp} onClick={() => updateWeatherSetting({ isTemp: !weatherSetting.isTemp })} />
              </div>
            </div>
          </SettingContentWrapper>
        </article>
      )}
    </div>
  )
}