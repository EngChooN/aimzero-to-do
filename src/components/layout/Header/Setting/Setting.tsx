'use client'

// import { bgColorPalette } from "@/constants/bgColorPalette"
import { IoSettingsSharp } from "react-icons/io5"
import { useEffect, useState } from "react"
import SettingDropdown from "./SettingDropdown"

export default function Setting() {
  const [isSetting, setIsSetting] = useState(false)

  useEffect(() => {
    // default 테마값 로컬 스토리지에 저장
    if (!localStorage.getItem('bg-color')) {
      localStorage.setItem('bg-color', 'default')
    }
  }, [])

  return (
    <div className="relative">
      <IoSettingsSharp className="text-[28px] cursor-pointer" onClick={() => setIsSetting(true)} />
      {isSetting && (
        <SettingDropdown onClose={() => setIsSetting(false)} />
      )}
    </div>
  )
}