import { ButtonHTMLAttributes } from "react"
import { X } from "lucide-react"

export function ButtonClose(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      <X />
    </button>
  )
}
