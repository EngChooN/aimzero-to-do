import { useBookmarkStore } from "@/store/useBookmarkStore"


export default function AddBookmarkSubmit() {
  const { bookmarkForm, setBookmarkForm } = useBookmarkStore()
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 h-12 border-b-[1px] border-b-gray-300/20">
        <p className="text-gray-200/60">Url:</p>
        <input className="w-full focus:outline-none bg-inherit h-full" onChange={(event) => {
          setBookmarkForm({...bookmarkForm, url: event.target.value})
        }} />
      </div>
      <div className="flex items-center gap-2 h-12 py-2">
        <p className="text-gray-200/60">Name:</p>
        <input className="w-full focus:outline-none bg-inherit h-full" onChange={(event) => {
          setBookmarkForm({...bookmarkForm, name: event.target.value})
        }} />
      </div>
    </div>
  )
}