"use client"
import { ButtonHTMLAttributes, useState } from "react"
import { Check, Copy } from "lucide-react"

interface Props {
  textToCopy: string
}

export function ButtonCopy({ textToCopy }: Props) {
  const [copy, setCopy] = useState(false)

  const HandleCopyClipBoard = () => {
    navigator.clipboard.writeText(textToCopy)
    setCopy(true)

    setTimeout(() => {
      setCopy(false)
    }, 1500)
  }

  return (
    <button onMouseDown={HandleCopyClipBoard}>
      {!copy && <Copy />}
      {copy && <Check />}
      {copy && <span>¡Copiado!</span>}
    </button>
  )
}
