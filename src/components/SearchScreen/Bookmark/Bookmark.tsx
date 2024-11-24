import { useBookmarkStore } from "@/store/useBookmarkStore"
// import { IoEarth } from "react-icons/io5"
import { IoFolderOutline } from "react-icons/io5"
import AddBookmark from "./AddBookmark"
import { useState } from "react"
import BookmarkGroup from "./BookmarkGroup"

export default function Bookmark() {
  const [isGroup, setIsGroup] = useState(false)
  const { bookmarkItem } = useBookmarkStore()

  return (
    <section className="grid grid-cols-4 gap-6">
      {bookmarkItem.length < 8 && (
        <AddBookmark addType="bookmark" />
      )}
      {bookmarkItem.map((bookmark, index) => (
        bookmark.type === 'bookmark' ? (
          <div key={index} className="m-4 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-300/20 size-12 rounded-xl cursor-pointer overflow-hidden"
              onClick={() => window.open(bookmark.url)}
            >
              <img src={bookmark.favicon} className="size-full" />
            </div>
            <p className="mt-[7px] text-[12px]">{bookmark.name}</p>
          </div>
        ) : (
          <>
            <div className="m-4 flex flex-col items-center">
              <div className="flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-300/20 size-12 rounded-xl cursor-pointer overflow-hidden"
                onClick={() => setIsGroup(true)}
                >
                  <IoFolderOutline className="text-2xl" />
              </div>
              <p className="mt-[7px] text-[12px]">{bookmark.name}</p>
              {isGroup && (
                <BookmarkGroup onClose={() => setIsGroup(false)} group={bookmark} />  
              )}  
            </div>
          </>
        )
      ))}
    </section>
  )
}