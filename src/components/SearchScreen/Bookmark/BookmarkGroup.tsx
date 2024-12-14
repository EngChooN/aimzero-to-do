import { IBookmarkGroup } from "@/store/useBookmarkStore"
import { useRef } from "react"
import AddBookmark from "./AddBookmark"

interface Props {
  onClose: () => void
  group: IBookmarkGroup
}

export default function BookmarkGroup({ onClose, group }: Props) {
  const groupRef = useRef<HTMLDivElement>(null)

  console.log(group.id)

  return (
    <div onClick={onClose} className="p-3 flex-col gap-5 fixed top-0 left-0 size-full backdrop-blur-xl bg-slate-700/50 z-30 flex justify-center items-center animate-[fade-in_0.2s]">
      <h1 className="text-3xl mb-5">{group.name}</h1>
      <section ref={groupRef} className="size-[500px] rounded-[50px] bg-slate-100/20 p-10 overflow-auto no-scrollbar grid grid-cols-4 grid-rows-4 gap-6 animate-[pop-in_0.3s]">
        <AddBookmark addType="group" groupId={group.id} />
        {group.bookmark.map((bookmark) => (
          <div key={bookmark.id} className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-300/20 size-14 rounded-2xl cursor-pointer overflow-hidden"
              onClick={() => window.open(bookmark.url)}
            >
              <img src={bookmark.favicon} className="size-full" alt={bookmark.name} />
            </div>
          <p className="mt-[4px] text-[13px]">{bookmark.name}</p>
          </div>
        ))}
      </section>
    </div>
  )
}