import { create } from "zustand"

export const useDateTimeStore = create()((set) => ({
  dateTimeSetting: {
    isDateTime: true,
    isDate: true,
    isTime: true,
  },
  // 개별 설정을 업데이트하는 함수
  updateDateTimeSetting: (setting) =>
    set((state) => ({
      dateTimeSetting: { ...state.dateTimeSetting, ...setting }
    })),
}))
