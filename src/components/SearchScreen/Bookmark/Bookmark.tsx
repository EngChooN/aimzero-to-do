import { IBookmark, useBookmarkStore } from "@/store/useBookmarkStore"
// import { IoEarth } from "react-icons/io5"
import { IoAdd } from "react-icons/io5"

export default function Bookmark() {
  const { bookmark, addBookmark } = useBookmarkStore()
  
  const handleAddBookmark = (): void => {
    const bookmarkObj: IBookmark = {
      url: 'https://www.naver.com/',
      favicon: 'https://www.naver.com/favicon.ico',
      name: '네이버',
    }
    addBookmark(bookmarkObj)
  }

  return(
    <section className="grid grid-cols-4 gap-6">
      {bookmark.length < 8 && (
        <div className="size-12 flex justify-center items-center cursor-pointer rounded-xl hover:bg-slate-50/20">
          <IoAdd onClick={handleAddBookmark} className="text-2xl" />
        </div>  
      )}
      {bookmark.map((el, index) => (
        <div className="flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-300/20 size-12 rounded-xl cursor-pointer" key={index} onClick={() => window.open(el.url)}>
          <img src={el.favicon} className="size-6" />
          {/* <p className="mt-[3px] text-[10px]">{el.name}</p> */}
        </div>
      ))}
    </section>
  )
}