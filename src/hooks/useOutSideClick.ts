import { RefObject, useEffect } from "react"

export const useOutSideClick = (ref: RefObject<HTMLElement>, outSideFunc: () => void) => {
  useEffect(() => {
    const outSideClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        outSideFunc()
      }
    }
    document.addEventListener('click', outSideClick)

    return () => {
      document.removeEventListener('click', outSideClick)
    }
  }, [ref, outSideFunc])
}