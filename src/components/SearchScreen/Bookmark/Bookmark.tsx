import { useBookmarkStore } from "@/store/useBookmarkStore"
// import { IoEarth } from "react-icons/io5"
import { IoFolderOutline } from "react-icons/io5"
import AddBookmark from "./AddBookmark"
import { useState } from "react"
import BookmarkGroup from "./BookmarkGroup"

export default function Bookmark() {
  const [isGroup, setIsGroup] = useState<string | null>(null)
  const { bookmarkItem } = useBookmarkStore()

  
  // 북마크 리스트 화면 UI (북마크와 그룹이 표시됨)
  return (
    <section className="grid grid-cols-4 gap-6">
      {bookmarkItem.length < 8 && (
        <AddBookmark addType="bookmark" />
      )}
      {bookmarkItem.map((bookmark) => (
        // bookmark type bookmark
        bookmark.type === 'bookmark' ? (
          <div key={bookmark.id} className="m-4 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-300/20 size-12 rounded-xl cursor-pointer overflow-hidden"
              onClick={() => window.open(bookmark.url)}
            >
              <img src={bookmark.favicon} className="size-full" />
            </div>
            <p className="mt-[7px] text-[12px]">{bookmark.name}</p>
          </div>
        ) : (
          // bookmark type group    
          <div key={bookmark.id} className="m-4 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-300/20 size-12 rounded-xl cursor-pointer overflow-hidden"
              onClick={() => setIsGroup(bookmark.id)}
              >
                <IoFolderOutline className="text-2xl" />
            </div>
            <p className="mt-[7px] text-[12px]">{bookmark.name}</p>
            {isGroup === bookmark.id && (
              <BookmarkGroup onClose={() => setIsGroup(null)} group={bookmark} />  
            )}  
          </div>
        )
      ))}
    </section>
  )
}