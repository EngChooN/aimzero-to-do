'use client'

import { useDateTimeStore } from "@/store/useSettingStore"
import { useEffect, useState } from "react"

interface IDateInfo {
  year: string
  month: string
  day: string
  hour: string
  minute: string
  weekDay: string
}

export default function DateInfo() {
  const {dateTimeSetting} = useDateTimeStore()
  const [dateInfo, setDateInfo] = useState<IDateInfo | null>(null)
  
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

      setDateInfo({
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1).padStart(2, '0'),
        day: String(date.getDate()).padStart(2, '0'),
        hour: String(date.getHours()).padStart(2, '0'),
        minute: String(date.getMinutes()).padStart(2, '0'),
        weekDay: weekDay[date.getDay()]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <article className="flex items-center text-lg">
      {dateInfo && (
      <>
        {dateTimeSetting.isDate && (
          <>
            <>
              <p>{dateInfo?.year}</p>
              <p className="mx-1">.</p>
            </>
            <>
              <p>{dateInfo?.month}</p>
              <p className="mx-1">.</p>
              <p>{dateInfo?.day}</p>
            </>
          </>
        )}
        {dateTimeSetting.isWeekDay && (
          <p className="ml-2">({dateInfo.weekDay})</p>
        )}
        {dateTimeSetting.isTime && (
          <>
            <p className="ml-3">{dateInfo?.hour}</p>
            <p className="mx-1 animate-[pika_1s_steps(1)_infinite]">:</p>
            <p>{dateInfo?.minute}</p>
          </>
        )}
      </>
      )}
    </article>
  )
}