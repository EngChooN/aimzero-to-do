import { create } from "zustand"

interface IModalConfig<T extends React.ComponentType = React.ComponentType> {
  component: any
  props?: React.ComponentProps<T>
}

interface IModalStore {
  isModal: boolean
  modalConfig: IModalConfig
  openModal: <T extends React.ComponentType>(config: IModalConfig<T>) => void
  closeModal: () => void
}

export const useModalStore = create<IModalStore>()((set) => ({
  isModal: false,
  modalConfig: {
    component: () => null,
    props: {},
  },
  openModal: <T extends React.ComponentType>(modalConfig: IModalConfig<T>) =>
    set({
      isModal: true,
      modalConfig: modalConfig,
    }),

  closeModal: () =>
    set({
      isModal: false,
      modalConfig: {
        component: () => null,
        props: {},
      }
    })
}))