interface IProps {
  children: React.ReactNode
  label: string
}

export default function SettingContentWrapper({ children, label }: IProps) {
  return (
    <div className="text-gray-800">
      <h2 className="mb-2 mt-7 px-2 text-[13px]">{label}</h2>
      <div className="bg-slate-100/30 rounded-2xl py-3 px-2">
        <div className="w-full overflow-auto no-scrollbar flex">
          {children}
        </div>
      </div>
    </div>
  )
}