import { useBookmarkStore } from "@/store/useBookmarkStore"
// import { IoEarth } from "react-icons/io5"
import { IoFolderOutline } from "react-icons/io5"
import { HiMiniMinusCircle } from "react-icons/hi2"
import AddBookmark from "./AddBookmark"
import { useRef, useState } from "react"
import BookmarkGroup from "./BookmarkGroup"
import { useOutSideClick } from "@/hooks/useOutSideClick"

export default function Bookmark() {
  const [isGroup, setIsGroup] = useState<string | null>(null) // group의 id의 유무로 띄움
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const bookmarkRef = useRef(null)
  const longPressTimer = useRef<NodeJS.Timeout>()
  const { bookmarkItem, deleteBookmark } = useBookmarkStore()

  // 에디팅 모드 진입
  const enterEditingMode = () => {
    longPressTimer.current = setTimeout(() => {
      setIsEditing(true)
    }, 1000)
  }

  // 에디팅 모드 종료
  useOutSideClick(bookmarkRef, () => {
    if(isEditing) setIsEditing(false)
  })

  const deleteBookmarkOrGroup = (bookmarkId: string) => {
    deleteBookmark(bookmarkId)
  }
  
  // 북마크 리스트 화면 UI (북마크와 그룹이 표시됨)
  return (
    <section ref={bookmarkRef} className="grid grid-cols-4 gap-6">
      {bookmarkItem.length < 8 && (
        <AddBookmark addType="bookmark" />
      )}
      {bookmarkItem.map((bookmark) => (
        // bookmark type bookmark
        bookmark.type === 'bookmark' ? (
          <div key={bookmark.id} className={`${isEditing && 'animate-[shake_0.2s_infinite]'} relative m-4 flex flex-col items-center`} onMouseDown={enterEditingMode} onMouseUp={() => clearTimeout(longPressTimer.current)} onTouchStart={enterEditingMode} onTouchEnd={() => clearTimeout(longPressTimer.current)}>
            <div className="flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-300/20 size-12 rounded-xl cursor-pointer overflow-hidden"
              onClick={() => {
                if(isEditing) return
                window.open(bookmark.url)
              }}
            >
              <img src={bookmark.favicon} className="size-full" />
            </div>
            <p className="mt-[7px] text-[12px]">{bookmark.name}</p>
            {isEditing && (<HiMiniMinusCircle className="absolute top-[-9px] right-[-9px] size-5 cursor-pointer" onClick={() => deleteBookmarkOrGroup(bookmark.id)} />)}
          </div>
        ) : (
          // bookmark type group    
            <div key={bookmark.id} className={`${isEditing && 'animate-[shake_0.2s_infinite]'} relative m-4 flex flex-col items-center`} onMouseDown={enterEditingMode} onMouseUp={() => clearTimeout(longPressTimer.current)} onTouchStart={enterEditingMode} onTouchEnd={() => clearTimeout(longPressTimer.current)}>
              <div className="flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-300/20 size-12 rounded-xl cursor-pointer overflow-hidden"
                  onClick={() => {
                    if(isEditing) return
                    setIsGroup(bookmark.id)
                  }}
                >
                  <IoFolderOutline className="text-2xl" />
              </div>
              <p className="mt-[7px] text-[12px]">{bookmark.name}</p>
              {isEditing && (<HiMiniMinusCircle className="absolute top-[-9px] right-[-9px] size-5 cursor-pointer" onClick={() => deleteBookmarkOrGroup(bookmark.id)} />)}
              {/* 그룹 보기 모달 */}
              {isGroup === bookmark.id && (
                <BookmarkGroup onClose={() => setIsGroup(null)} group={bookmark} />  
              )}  
          </div>
        )
      ))}
    </section>
  )
}