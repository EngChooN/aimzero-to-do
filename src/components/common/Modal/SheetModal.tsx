import { useOutSideClick } from "@/hooks/useOutSideClick"
import { useModalStore } from "@/store/useModalStore"
import { ReactNode, useRef } from "react"

interface Props {
  label: string
  buttonLabel: string
  buttonAction: () => void
  child: ReactNode
}

export default function SheetModal({ label, buttonLabel, buttonAction, child }: Props) {
  const { closeModal } = useModalStore()
  const modalRef = useRef<HTMLDivElement>(null)

  useOutSideClick(modalRef, () => {
    closeModal()
  })

  return (
    <div className="p-3 flex-col gap-5 fixed top-0 left-0 size-full backdrop-blur-xl bg-slate-700/50 z-40 flex justify-center items-center animate-[fade-in_0.2s]">
      <section ref={modalRef} className="flex flex-col max-w-[500px] w-full h-5/6 rounded-t-xl fixed bottom-0 left-auto overflow-hidden bg-gray-200/20 pb-5 animate-[pop-bottom_0.4s]">
        <div className="flex flex-col px-3 py-4">
          <div className="flex items-center justify-between">
            <button className="text-blue-400" onClick={() => closeModal()}>Cancel</button>
            <h1>{label}</h1>
            <button onClick={() => {
              buttonAction()
              closeModal()
            }} className="text-blue-400">{buttonLabel}</button>
          </div>
        </div>
        <div className="bg-gray-100/10 px-3">
          {child}
        </div>
      </section>
    </div>
  )
}