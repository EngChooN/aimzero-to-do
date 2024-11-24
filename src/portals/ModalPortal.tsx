'use client'

import { ReactNode, useEffect, useState } from "react"
import ReactDOM from "react-dom"

export default function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // 서버 사이드에서는 null 반환
  if (!mounted) return null
  
  const el = document.getElementById('modal') as HTMLElement
  return ReactDOM.createPortal(children, el)
}