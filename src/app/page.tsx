'use client'

import SearchScreen from "@/components/SearchScreen/SearchScreen"
import { useEffect, useState } from "react"

export default function Home() {
  const [bgColor, setBgColor] = useState<string>('default')

  useEffect(() => {
    const localStorageBgColor = localStorage.getItem('bg-color')
    setBgColor(String(localStorageBgColor))
  }, [])

  return (
    // TODO 테마 적용한 곳은 이곳에 설정해야함
    <main className={`flex flex-col items-center w-full h-dvh ${bgColor === 'default' ? null : bgColor}`}>
      <SearchScreen />
    </main>
  );
}
