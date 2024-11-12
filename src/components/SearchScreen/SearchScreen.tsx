'use client'

import SearchInput from "./SearchInput/SearchInput";

export default function SearchScreen() {

  return (
    <section className="flex flex-col items-center gap-10 mt-[20vh] px-6 max-w-2xl w-full">
      {/* TODO 유저가 본인의 이름을 추가하면, 'Hello, OOO'이런 식으로 나와야함 */}
      <h1 className="text-7xl">{`Hello`}</h1>
      <SearchInput />
    </section>
  )
}