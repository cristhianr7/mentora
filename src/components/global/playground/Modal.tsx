"use client"
import { MouseEvent, useState, KeyboardEvent } from "react"
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"
interface Props {
  children: React.ReactNode
  onClick: () => void
  allowBackground?: boolean
}

export function Modal({ children, onClick, allowBackground }: Props) {
  const [bounds, setBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 })
  const [click, setClick] = useState(false)

  const handleStart = (e: DraggableEvent, data: DraggableData) => {
    if (!data) {
      return
    }

    const x = data.node.offsetLeft - data.node.offsetWidth / 2
    const top = -data.node.offsetTop + data.node.offsetHeight / 2
    const bottom =
      window.innerHeight - (data.node.offsetTop + data.node.offsetHeight / 2)

    setBounds({ left: -x, right: x, top: top, bottom: bottom })
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLDialogElement | HTMLDivElement>,
  ) => {
    if (e.key === "Escape" && onClick) {
      onClick()
    }
  }

  function HandleClickDialog(event: MouseEvent<HTMLDialogElement>): void {
    const target = event.target

    if (target instanceof HTMLDialogElement) {
      setClick(true)
      setTimeout(() => {
        setClick(false)
      }, 200)
    }
  }

  return (
    <>
      {!allowBackground && (
        <dialog
          className="z-50"
          open
          onClick={HandleClickDialog}
          onKeyDown={handleKeyDown}
        >
          <Draggable onStart={handleStart} bounds={bounds}>
            {children}
          </Draggable>
        </dialog>
      )}
      {allowBackground && (
        <div className="z-50" onKeyDown={handleKeyDown}>
          <Draggable onStart={handleStart} bounds={bounds}>
            {children}
          </Draggable>
        </div>
      )}
    </>
  )
}
