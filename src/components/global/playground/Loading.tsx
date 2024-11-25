interface Props {
  title: string
}

export function Loading({ title }: Props) {
  return (
    <div className="flex flex-col items-center space-y-2 py-4">
      <div className="text-lg text-gray-500">CARGANDO...</div>
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    </div>
  )
}
