import { useOutSideClick } from "@/hooks/useOutSideClick"
import { useModalStore } from "@/store/useModalStore"
import { useRef } from "react"

interface Props {
  desc: string
  primaryButton: {
    label: string,
    onClick: () => void
  }
  secondaryButton?: {
    label: string,
    onClick: () => void
  }
}

export default function SelectModal({desc, primaryButton, secondaryButton }: Props) {
  const { closeModal } = useModalStore()
  const modalRef = useRef<HTMLDivElement>(null)

  useOutSideClick(modalRef, () => {
    closeModal()
  })
  
  return (
    <div className="p-3 flex-col gap-5 absolute top-0 left-0 size-full backdrop-blur-xl bg-slate-700/50 z-40 flex justify-center items-center animate-[fade-in_0.2s]">
      <section ref={modalRef} className="max-w-[320px] w-full h-fit rounded-3xl bg-slate-100/20 flex flex-col overflow-hidden">
        <p className="font-bold p-4 text-center text-gray-100">{desc}</p>
        <div>
          <div onClick={() => {
            primaryButton.onClick()
            closeModal()
          }} className="cursor-pointer text-blue-400 border-t-[1px] border-t-gray-300/50 text-center p-3 hover:bg-slate-600/10">
            {primaryButton.label}
          </div>
          {secondaryButton && (
            <div onClick={() => {
              secondaryButton.onClick()
              closeModal()
            }} className="cursor-pointer text-blue-400 border-t-[1px] border-t-gray-300/50 text-center p-3 hover:bg-slate-600/10">
              {secondaryButton.label}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}