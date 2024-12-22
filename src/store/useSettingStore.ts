import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IDateTimeSetting {
  isDate: boolean
  isTime: boolean
  isWeekDay: boolean
}

interface IDateTimeStore {
  dateTimeSetting: IDateTimeSetting
  updateDateTimeSetting: (setting: Partial<IDateTimeSetting>) => void
}

export const useDateTimeStore = create<IDateTimeStore>()(
  persist(
    (set) => ({
      dateTimeSetting: {
        isDate: true,
        isTime: true,
        isWeekDay: true,
      },
      updateDateTimeSetting: (setting) =>
        set((state) => ({
          dateTimeSetting: { ...state.dateTimeSetting, ...setting }
        })),
    }),
    {
      name: 'date-setting-storage'
    }
  )
)

interface IWeatherSetting {
  isIcon: boolean
  isLocation: boolean
  isTemp: boolean
}

interface IWeatherStore {
  weatherSetting: IWeatherSetting
  updateWeatherSetting: (setting: Partial<IWeatherSetting>) => void
}

export const useWeatherStore = create<IWeatherStore>()(
  persist(
    (set) => ({
      weatherSetting: {
        isIcon: true,
        isLocation: true,
        isTemp: true,
      },
      updateWeatherSetting: (setting) =>
        set((state) => ({
          weatherSetting: { ...state.weatherSetting, ...setting }
        })),
    }),
    {
      name: 'weather-setting-storage'
    }
  )
)
