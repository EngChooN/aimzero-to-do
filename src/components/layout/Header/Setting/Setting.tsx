'use client'

import { bgColorPalette } from "@/constants/bgColorPalette"
import { useOutSideClick } from "@/hooks/useOutSideClick"
import { useEffect, useRef, useState } from "react"
import { IoSettingsSharp } from "react-icons/io5"
import SettingContentWrapper from "./SettingContentWrapper/SettingContentWrapper"

export default function Setting() {
  const [isSetting, setIsSetting] = useState(false)
  const settingRef = useRef<HTMLDivElement>(null)

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
        <article className="gap-3 absolute p-4 right-0 top-10 flex flex-col w-96 h-96 shadow-md rounded-3xl backdrop-blur-xl bg-slate-200/40 z-30">
          <SettingContentWrapper>
            {bgColorPalette.map((color, index) => (
                <div className={`flex-shrink-0 size-9 rounded-full flex justify-center items-center mr-3 ${color.color === 'default' ? 'bg-slate-300' : color.color}`} key={index} onClick={() => setBgColor(color.color)} />
              ))}
          </SettingContentWrapper>
        </article>
      )}
    </div>
  )
}