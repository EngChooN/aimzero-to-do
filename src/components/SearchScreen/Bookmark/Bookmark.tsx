import { IBookmark, useBookmarkStore } from "@/store/useBookmarkStore"
// import { IoEarth } from "react-icons/io5"

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
    <section className="flex gap-6 items-center justify-center">
      <div onClick={handleAddBookmark}>+</div>
      {bookmark.map((el, index) => (
        <div className="flex flex-col items-center" key={index} onClick={() => window.open(el.url)}>
          <img src={el.favicon} />
          <p>{el.name}</p>
        </div>
      ))}
    </section>
  )
}