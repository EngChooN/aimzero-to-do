'use client'

import { useOutSideClick } from "@/hooks/useOutSideClick"
import { useEffect, useRef, useState } from "react"
import { IoSearchOutline, IoCloseOutline, IoTimerOutline } from "react-icons/io5"

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isComposition, setIsComposition] = useState<boolean>(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isFocusSearchBar, setIsFocusSearchBar] = useState<boolean>(false)
  const searchAreaRef = useRef<HTMLDivElement>(null)

  useOutSideClick(searchAreaRef, () => {
    setIsFocusSearchBar(false)
  })
  
  const submitSearch = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isComposition) {
      const newSearchHistory = [searchValue, ...searchHistory]
      setSearchHistory(newSearchHistory)
      localStorage.setItem('search-history', JSON.stringify(newSearchHistory))
      window.open(`https://www.google.co.kr/search?q=${encodeURIComponent(searchValue)}`)
    }
  }

  const clickSearchHistory = (history: string) => {
    window.open(`https://www.google.co.kr/search?q=${encodeURIComponent(history)}`)
  }

  const deleteHistory = (index: number) => {
    const newSearchHistory = [...searchHistory]
    newSearchHistory.splice(index, 1)
    setSearchHistory(newSearchHistory)
    localStorage.setItem('search-history', JSON.stringify(newSearchHistory))
  }

  useEffect(() => {
    const localStorageSearchHistory = localStorage.getItem('search-history')
    if (localStorageSearchHistory) {
      setSearchHistory(JSON.parse(localStorageSearchHistory))
    }
  }, [])
  
  return (
    <article className="relative w-full flex justify-center" ref={searchAreaRef}>
      <IoSearchOutline className="absolute top-1/3 left-6 text-lg text-slate-700 z-20" />
      <input
        className={`m-[6px] w-full h-12 backdrop-blur-xl rounded-3xl px-12 bg-slate-100/80 text-slate-700 ${!isFocusSearchBar || (isFocusSearchBar && searchHistory.length === 0) ? 'shadow-md' : ''} focus:outline-none z-10`}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onCompositionStart={() => setIsComposition(false)}
        onCompositionEnd={() => setIsComposition(true)}
        onKeyDown={(event) => submitSearch(event)}
        onFocus={() => setIsFocusSearchBar(true)}
        placeholder="Search Google"
      />
      {searchValue && (
        <IoCloseOutline
          className="absolute top-1/3 right-6 text-lg text-slate-700 cursor-pointer z-20"
          onClick={() => setSearchValue('')}
        />
      )}
      {searchHistory.length > 0 && isFocusSearchBar === true ? (
        <ul className="transition-all duration-500 ease-in-out absolute top-0 left-0 w-full pt-14 pb-2 backdrop-blur-xl bg-slate-200/70 text-slate-700
          shadow-md rounded-[28px] overflow-hidden animate-[fade-in_0.2s] z-10">
          {searchHistory.slice(0, 5).map((history, index) => (
            <div key={index} className="relative px-14 hover:bg-slate-200/30">
              <IoTimerOutline className="absolute top-1/3 left-6 text-lg text-slate-700 z-20" />
              <li className="flex items-center h-12"
                onClick={() => clickSearchHistory(history)}>{history}
              </li>
              <IoCloseOutline
                className="absolute top-1/3 right-6 text-lg text-slate-700 cursor-pointer z-20"
                onClick={() => deleteHistory(index)}
              />
            </div>
          ))}
        </ul>
      ) : null}
    </article>
  )
}