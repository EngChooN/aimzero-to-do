import { create } from "zustand"
import { persist } from 'zustand/middleware'

export interface IBookmark {
  id: string
  url: string
  favicon: string
  name: string
  type: 'bookmark'
}

export interface IBookmarkGroup {
  id: string
  name: string
  bookmark: IBookmark[]
  type: 'group'
}

export type BookmarkItem = IBookmark | IBookmarkGroup

interface IBookmarkForm {
  url: string
  name: string
}

interface IBookmarkStore {
  bookmarkItem: BookmarkItem[]
  bookmarkForm: IBookmarkForm
  setBookmarkForm: (bookmarkForm: IBookmarkForm) => void
  addBookmark: (bookmark: BookmarkItem) => void
  addBookmarkFromGroup: (groupId: string, bookmark: BookmarkItem) => void
  deleteBookmark: (bookmarkId: string) => void
  deleteBookmarkFromGroup: (groupId: string, bookmarkId: string) => void
}

export const useBookmarkStore = create<IBookmarkStore>()(
  persist(
    (set) => ({
      bookmarkItem: [],
      bookmarkForm: {
        url: '',
        name: '', // bookmark group에서는 name 값만 받는다
      },
      setBookmarkForm: (bookmarkForm: IBookmarkForm) => {
        set((state) => ({
          bookmarkForm: {
            ...state.bookmarkForm,
            ...bookmarkForm
          }
        }))
      },
      // 북마크 추가
      addBookmark: (bookmarkItem: BookmarkItem) =>
        set((state) => ({
          bookmarkItem: [...state.bookmarkItem, bookmarkItem]
        })),
      addBookmarkFromGroup: (groupId: string, bookmarkItem: BookmarkItem) =>
        set((state) => {
          const updatedBookmarkItem = state.bookmarkItem.map((item) => {
            if (item.type === 'group' && item.id === groupId) {
              return {
                ...item,
                bookmark: [...item.bookmark, bookmarkItem as IBookmark],
              }
            }
            return item;
          })

          return {
            bookmarkItem: updatedBookmarkItem,
          }
        }),
      deleteBookmark: (bookmarkId: string) =>
        set((state) => ({
          bookmarkItem: state.bookmarkItem.filter(bookmark => bookmark.id !== bookmarkId)
        })),
      deleteBookmarkFromGroup: (groupId: string, bookmarkId: string) =>
        set((state) => ({
          bookmarkItem: state.bookmarkItem.map(item => {
            if (item.id === groupId && item.type === 'group') {
              return {
                ...item,
                bookmark: item.bookmark.filter(b => b.id !== bookmarkId)
              }
            }
            return item
          })
        })),
    }), {
    name: 'bookmark-storage'
  }),
)
