interface Props {
  value: boolean
  disabled?: boolean
  onClick: () => void
}

export default function Toggle({value, disabled, onClick}: Props) {
  return (
    <div onClick={!disabled ? onClick : undefined}
      className={`
        w-14 h-8 rounded-2xl p-[2px] flex relative
        ${value ? 'bg-green-500' : 'bg-slate-400'} 
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'} 
        items-center
      `}
    >
      <div className={`
          absolute size-7 bg-white rounded-full transition-all duration-200
          ${value 
            ? 'translate-x-6' 
            : 'translate-x-0'
          }
        `}
      />
    </div>
  )
}