interface Props {
  value: boolean
  onClick: () => void
}

export default function Toggle({value, onClick}: Props) {
  return (
    <div onClick={onClick} className={`relative w-16 h-8 rounded-2xl p-[2px] flex ${value ? 'justify-end bg-green-600' : 'justify-start bg-slate-400'} items-center cursor-pointer`}>
      <div className="size-7 bg-white rounded-full"></div>
    </div>
  )
}