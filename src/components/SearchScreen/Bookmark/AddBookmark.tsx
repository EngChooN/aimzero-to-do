import SelectModal from "@/components/common/Modal/SelectModal"
import { IBookmark, IBookmarkGroup, useBookmarkStore } from "@/store/useBookmarkStore"
import { IoAdd } from "react-icons/io5"
import { useModalStore } from "@/store/useModalStore"
import { v7 as uuidv7 } from 'uuid'
import SheetModal from "@/components/common/Modal/SheetModal"
import AddBookmarkSubmit from "./AddBookmarkSubmit"

export default function AddBookmark({ addType }: { addType: 'bookmark' | 'group' }) {
  const { addBookmark } = useBookmarkStore()
  const { openModal } = useModalStore()

  const openBookmarkSheetModal = async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
    openModal({
      component: SheetModal,
      props: {
        label: 'Add Bookmark',
        buttonLabel: 'Add',
        buttonAction: handleAddBookmark,
        child: <AddBookmarkSubmit />,
      }
    })
  }

  const handleAddBookmark = (): void => {
    const { bookmarkForm } = useBookmarkStore.getState()
    // TODO URL이 아닌경우의 케이스를 고려해야함
    const bookmarkObjResult: IBookmark = {
      id: uuidv7(),
      url: bookmarkForm.url,
      favicon: `${new URL(bookmarkForm.url).origin}/favicon.ico`,
      name: bookmarkForm.name,
      type: 'bookmark'
    }
    addBookmark(bookmarkObjResult)
  }
  
  // TODO 입력받아서 추가하게 만들어야함
  const handleAddBookmarkGroup = (): void => {
    const bookmarkObj: IBookmarkGroup = {
      id: uuidv7(),
      name: '업무1',
      type: 'group',
      bookmark: [
        {
          id: uuidv7(),
          url: 'https://www.naver.com/',
          favicon: 'https://www.naver.com/favicon.ico',
          name: '네이버',
          type: 'bookmark'
        },
        {
          id: uuidv7(),
          url: 'https://www.naver.com/',
          favicon: 'https://www.naver.com/favicon.ico',
          name: 'NAVER',
          type: 'bookmark'
        },
        {
          id: uuidv7(),
          url: 'https://www.naver.com/',
          favicon: 'https://www.naver.com/favicon.ico',
          name: '네이버',
          type: 'bookmark'
        },
        {
          id: uuidv7(),
          url: 'https://www.naver.com/',
          favicon: 'https://www.naver.com/favicon.ico',
          name: '네이버',
          type: 'bookmark'
        }
      ]
    }
    addBookmark(bookmarkObj)
  }

  return (
      <div className="m-4 flex flex-col items-center">
        <div className="size-12 flex justify-center items-center cursor-pointer rounded-xl bg-slate-50/20 hover:bg-slate-50/30"
          onClick={() => openModal({
            component:  SelectModal,
            props: addType === 'group' 
              ? {
                  desc: 'Add a new bookmark to your collection.',
                  primaryButton: {
                    label: 'Add Bookmark',
                    onClick: handleAddBookmark,
                  }
                }
              : {
                  desc: 'You can add bookmarks or groups. Groups are a collection of bookmarks that provide the ability to display all bookmarks within a group in your browser.',
                  primaryButton: {
                    label: 'Add Bookmark',
                    onClick: openBookmarkSheetModal,
                  },
                  secondaryButton: {
                    label: 'Add Group',
                    onClick: handleAddBookmarkGroup
                  }
                },
          })}
        >
          <IoAdd className="text-2xl" />
        </div>
        <p className="mt-[7px] text-[12px]">Add</p>
      </div>
  )
}