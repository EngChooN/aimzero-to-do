import { create } from "zustand"

export interface IBookmark {
  url: string
  favicon: string
  name: string
}

interface IBookmarkStore {
  bookmark: IBookmark[]
  addBookmark: (bookmark: IBookmark) => void
}

export const useBookmarkStore = create<IBookmarkStore>()((set) => ({
  bookmark: [],
  addBookmark: (bookmark: IBookmark) =>
    set((state) => ({
      bookmark: [...state.bookmark, bookmark]
    }))
}));
