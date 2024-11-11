'use client'

import { useOutSideClick } from "@/hooks/useOutSideClick"
import { useEffect, useRef, useState } from "react"
import { IoSettingsSharp } from "react-icons/io5"

export default function Setting() {
  const [isSetting, setIsSetting] = useState(false)
  const settingRef = useRef<HTMLDivElement>(null)
  const bgColorPalette = [
    {
      color: 'default',
      label: 'default'
    },
    {
      color: 'bg-blue-300',
      label: 'blue'
    },
    {
      color: 'bg-red-300',
      label: 'red'
    },
    {
      color: 'bg-yellow-300',
      label: 'yellow'
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
      <IoSettingsSharp className="text-3xl cursor-pointer" onClick={() => setIsSetting((prev) => !prev)} />
      {isSetting && (
        <article className="absolute right-0 top-10 flex flex-col w-96 h-96 shadow-md rounded-3xl bg-slate-200 z-30">
          <div className="w-full overflow-auto flex">
            {bgColorPalette.map((color, index) => (
              <div className={`size-16 rounded-full flex justify-center items-center ml-3 mt-3 ${color.color === 'default' ? 'bg-white' : color.color}`} key={index} onClick={() => setBgColor(color.color)}>{color.label}</div>
            ))}
          </div>
        </article>
      )}
    </div>
  )
}