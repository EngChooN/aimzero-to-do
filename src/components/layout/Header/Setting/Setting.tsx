'use client'

import { useOutSideClick } from "@/hooks/useOutSideClick"
import { useRef, useState } from "react"
import { IoSettingsSharp } from "react-icons/io5"

export default function Setting() {
  const [isSetting, setIsSetting] = useState(false)
  const settingRef = useRef<HTMLDivElement>(null)

  useOutSideClick(settingRef, () => setIsSetting(false))



  return (
    <div className="relative" ref={settingRef}>
      <IoSettingsSharp className="text-3xl cursor-pointer" onClick={() => setIsSetting((prev) => !prev)} />
      {isSetting && (
        <article className="absolute right-0 top-10 w-96 h-96 shadow-md rounded-3xl bg-slate-200 z-30">

        </article>
      )}
    </div>
  )
}