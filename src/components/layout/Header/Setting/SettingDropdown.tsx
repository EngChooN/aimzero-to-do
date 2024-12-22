import SettingContentWrapper from "@/components/layout/Header/Setting/SettingContentWrapper/SettingContentWrapper";
import { useDateTimeStore, useWeatherStore } from "@/store/useSettingStore";
import Toggle from "@/components/common/Toggle";
import { useRef } from "react";
import { useOutSideClick } from "@/hooks/useOutSideClick";

export default function SettingDropdown({onClose}: {onClose: () => void}) {
  const settingRef = useRef<HTMLDivElement>(null)
  const { dateTimeSetting, updateDateTimeSetting } = useDateTimeStore()
  const { weatherSetting, updateWeatherSetting } = useWeatherStore()
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

  useOutSideClick(settingRef, () => {
    onClose()
  })

  return (
    <>
      <div className="backdrop-blur-xl fixed top-14 left-0 size-full animate-[fade-in_0.2s]" />
      <section ref={settingRef} className="absolute top-10 right-0 w-[350px] h-[400px] shadow-md backdrop-blur-xl rounded-3xl bg-slate-100/40 p-3 pt-0 overflow-auto no-scrollbar animate-[fade-in_0.2s]">
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
      </section>
    </>  
  )
}