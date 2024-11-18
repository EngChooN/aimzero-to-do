interface Props {
  value: boolean
  disabled?: boolean
  onClick: () => void
}

export default function Toggle({value, disabled, onClick}: Props) {
  return (
    <div onClick={!disabled ? onClick : undefined}
      className={`
        w-14 h-8 rounded-2xl p-[2px] flex 
        ${value ? 'justify-end bg-green-500' : 'justify-start bg-slate-400'} 
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:opacity-90 active:scale-95'} 
        items-center
      `}
    >
      <div className="size-7 bg-white rounded-full"></div>
    </div>
  )
}