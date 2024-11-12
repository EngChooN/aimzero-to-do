import Setting from "./Setting/Setting";


export default function Header() {
  return (
    <header className="fixed top-0 left-0 flex items-center justify-end w-full h-14 px-3 z-30">
      <Setting />
    </header>
  )
}