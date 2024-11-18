interface IProps {
  children: React.ReactNode
  label: string
}

export default function SettingContentWrapper({ children, label }: IProps) {
  return (
    <div className="bg-slate-100/20 rounded-2xl py-3 px-2 text-gray-600">
      <h2 className="mb-3">{label}</h2>
      <div className="w-full overflow-auto flex">
        {children}
      </div>
    </div>
  )
}