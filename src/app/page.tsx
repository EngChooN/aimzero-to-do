'use client'

import { useEffect, useRef, useState } from "react"
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5"

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isComposition, setIsComposition] = useState<boolean>(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isFocusSearchBar, setIsFocusSearchBar] = useState<boolean>(false)
  const searchAreaRef = useRef<HTMLDivElement>(null)
  
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

  const outSideClick = (event: MouseEvent | TouchEvent) => {
    if (!searchAreaRef.current?.contains(event.target as Node)) {
      setIsFocusSearchBar(false)
    }
  }

  useEffect(() => {
    const localStorageSearchHistory = localStorage.getItem('search-history')
    if (localStorageSearchHistory) {
      setSearchHistory(JSON.parse(localStorageSearchHistory))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousedown', outSideClick)
  }, [])

  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center mt-[15vh] gap-10 max-w-2xl w-full ">
        {/* TODO 유저가 본인의 이름을 추가하면, 'Hello, OOO'이런 식으로 나와야함 */}
        <h1 className="text-7xl">{`Hello`}</h1>
        <div className="relative w-full flex justify-center" ref={searchAreaRef}>
          <IoSearchOutline className="absolute top-1/3 left-5 text-lg text-slate-700 z-20" />
          <input
            className={`w-full h-12 rounded-3xl px-12 bg-slate-100 text-slate-700 ${!isFocusSearchBar || (isFocusSearchBar && searchHistory.length === 0) ? 'shadow-md' : ''} focus:outline-none z-10`}
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
              className="absolute top-1/3 right-5 text-lg text-slate-700 cursor-pointer z-20"
              onClick={() => setSearchValue('')}
            />
          )}
          {searchHistory.length > 0 && isFocusSearchBar === true ? (
            <ul className="absolute top-0 left-0 w-full pt-12 pb-2 bg-slate-100 text-slate-700
              shadow-md rounded-3xl overflow-hidden">
              {searchHistory.slice(0, 5).map((history, index) => (
                <div key={index} className="relative px-12 hover:bg-slate-200">
                  <li className="flex items-center h-12"
                    onClick={() => clickSearchHistory(history)}>{history}
                  </li>
                  <IoCloseOutline
                    className="absolute top-1/3 right-5 text-lg text-slate-700 cursor-pointer z-20"
                    onClick={() => deleteHistory(index)}
                  />
                </div>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </main>
  );
}
