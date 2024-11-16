'use client'

import { useEffect, useState } from "react"

interface IDateInfo {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

export default function DateInfo() {
  const [dateInfo, setDateInfo] = useState<IDateInfo | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()

      setDateInfo({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes()
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <article className="flex items-center text-lg font-light">
      <p>{dateInfo?.year}.</p>
      <p className="mr-2">{dateInfo?.month}.{dateInfo?.day}</p>
      <p>{dateInfo?.hour}:{dateInfo?.minute}</p>
    </article>
  )
}