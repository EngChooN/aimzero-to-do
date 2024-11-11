import { RefObject, useEffect } from "react"

export const useOutSideClick = (ref: RefObject<HTMLElement>, outSideFunc: () => void) => {
  useEffect(() => {
    const outSideClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        outSideFunc()
      }
    }
    window.addEventListener('mousedown', outSideClick)

    return () => {
      window.removeEventListener('mousedown', outSideClick)
    }
  }, [ref, outSideFunc])
}