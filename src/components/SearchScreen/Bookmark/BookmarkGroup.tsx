import { IBookmarkGroup, useBookmarkStore } from "@/store/useBookmarkStore"
import { useRef, useState } from "react"
import AddBookmark from "./AddBookmark"
import { useOutSideClick } from "@/hooks/useOutSideClick"
import ModalPortal from "@/portals/ModalPortal"
import { HiMiniMinusCircle } from "react-icons/hi2"

interface Props {
  onClose: () => void
  group: IBookmarkGroup
}

// 북마크 그룹 화면 UI (그룹을 눌렀을 때, 표시되는 화면)
export default function BookmarkGroup({ onClose, group }: Props) {
  const groupRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const longPressTimer = useRef<NodeJS.Timeout>()
  const { deleteBookmarkFromGroup } = useBookmarkStore()

  // 에디팅 모드 진입
  const enterEditingMode = () => {
    longPressTimer.current = setTimeout(() => {
      setIsEditing(true)
    }, 1000)
  }

  // 에디팅 모드 종료
  useOutSideClick(groupRef, () => {
    if(isEditing) setIsEditing(false)
  })

  return (
  <ModalPortal>
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && !isEditing) {
          onClose()
        }
      }}
      className="p-3 flex-col gap-5 fixed top-0 left-0 size-full backdrop-blur-xl bg-slate-700/50 z-40 flex justify-center items-center animate-[fade-in_0.2s]"
    >
      <h1 className="text-3xl mb-5">{group.name}</h1>
      <section className="size-[500px] rounded-[50px] bg-slate-100/20 p-10 overflow-auto no-scrollbar grid grid-cols-4 grid-rows-4 gap-6 animate-[pop-in_0.3s]">
        <AddBookmark addType="group" groupId={group.id} />
        {group.bookmark.map((bookmark) => (
          <div ref={groupRef} key={bookmark.id} className={`${isEditing && 'animate-[shake_0.2s_infinite]'} flex flex-col items-center`} onMouseDown={enterEditingMode} onMouseUp={() => clearTimeout(longPressTimer.current)} onTouchStart={enterEditingMode} onTouchEnd={() => clearTimeout(longPressTimer.current)}>
            <div className="flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-300/20 size-14 rounded-2xl cursor-pointer overflow-hidden"
              onClick={() => {
                if (isEditing) return
                window.open(bookmark.url)
              }}
            >
              <img src={bookmark.favicon} className="size-full" alt={bookmark.name} />
            </div>
            <p className="mt-[4px] text-[13px]">{bookmark.name}</p>
            {isEditing && (<HiMiniMinusCircle className="absolute top-[-9px] right-[9px] size-5 cursor-pointer" onClick={() => deleteBookmarkFromGroup(group.id, bookmark.id)} />)}
          </div>
        ))}
      </section>
      </div>
    </ModalPortal>
  )
}