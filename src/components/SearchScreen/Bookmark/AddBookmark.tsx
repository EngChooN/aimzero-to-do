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
        child: <AddBookmarkSubmit addType="bookmark" />,
      }
    })
  }

  const openBookmarkGroupSheetModal = async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
    openModal({
      component: SheetModal,
      props: {
        label: 'Add Group',
        buttonLabel: 'Add',
        buttonAction: handleAddBookmarkGroup,
        child: <AddBookmarkSubmit addType="group" />,
      }
    })
  }

  const handleAddBookmark = (): void => {
    const { bookmarkForm } = useBookmarkStore.getState()
    // TODO URL이 아닌경우의 케이스를 고려해야함, 필드가 없을 때 띄울 모달도 필요
    const bookmarkObjResult: IBookmark = {
      id: uuidv7(),
      url: bookmarkForm.url,
      favicon: `${new URL(bookmarkForm.url).origin}/favicon.ico`,
      name: bookmarkForm.name,
      type: 'bookmark'
    }
    addBookmark(bookmarkObjResult)
  }
  
  const handleAddBookmarkGroup = (): void => {
    // TODO 필드가 없을 때 띄울 모달 필요
    const { bookmarkForm } = useBookmarkStore.getState()
    const bookmarkGroupObjResult: IBookmarkGroup = {
      id: uuidv7(),
      name: bookmarkForm.name,
      type: 'group',
      bookmark: []
    }
    addBookmark(bookmarkGroupObjResult)
  }

  return (
    <div className={`${addType === 'bookmark' && 'm-4'} flex flex-col items-center`}>
        <div className={`${addType === 'bookmark' ? 'size-12 rounded-xl' : 'size-14 rounded-2xl'} flex justify-center items-center cursor-pointer bg-slate-50/20 hover:bg-slate-50/30`}
          onClick={() => openModal({
            component:  SelectModal,
            props: addType === 'group' 
              ? {
                  desc: 'Add a new bookmark to your collection.',
                  primaryButton: {
                    label: 'Add Bookmark',
                    onClick: openBookmarkSheetModal,
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
                    onClick: openBookmarkGroupSheetModal,
                  }
                },
          })}
        >
        <IoAdd className={`${addType === 'bookmark' ? 'text-2xl' : 'text-4xl'}`} />
        </div>
        <p className={`${addType === 'bookmark' ? 'mt-[7px] text-[12px]' : 'mt-[4px] text-[13px]' }`}>Add</p>
      </div>
  )
}