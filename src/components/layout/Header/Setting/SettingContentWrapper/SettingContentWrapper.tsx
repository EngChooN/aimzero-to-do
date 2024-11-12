export default function SettingContentWrapper({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-slate-100/20 rounded-2xl py-3 px-2 text-gray-600">
      <h2 className="mb-3">Theme</h2>
      <div className="w-full overflow-auto flex">
        {children}
      </div>
    </div>
  )
}