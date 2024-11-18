'use client'

import { useEffect, useState } from "react"

interface IDateInfo {
  year: string
  month: string
  day: string
  hour: string
  minute: string
}

export default function DateInfo() {
  const [dateInfo, setDateInfo] = useState<IDateInfo | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()

      setDateInfo({
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1).padStart(2, '0'),
        day: String(date.getDate()).padStart(2, '0'),
        hour: String(date.getHours()).padStart(2, '0'),
        minute: String(date.getMinutes()).padStart(2, '0')
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <article className="flex items-center text-lg">
      <p>{dateInfo?.year}.</p>
      <p className="mr-2">{dateInfo?.month}.{dateInfo?.day}</p>
      <p>{dateInfo?.hour}:{dateInfo?.minute}</p>
    </article>
  )
}