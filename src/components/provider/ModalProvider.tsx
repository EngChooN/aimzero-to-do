'use client'

import ModalPortal from "@/portals/ModalPortal"
import { useModalStore } from "@/store/useModalStore"


export default function ModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { isModal, modalConfig } = useModalStore()
  
  return (
    <>
      {isModal && modalConfig.component !== null && (
        <ModalPortal>
          <modalConfig.component {...modalConfig.props} />
        </ModalPortal>
      )}
      {children}
    </>
  )
}