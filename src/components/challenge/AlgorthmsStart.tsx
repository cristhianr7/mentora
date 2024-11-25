/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState } from "react"
import { useAlgorithm } from "@/lib/store"
import { useRouter } from "next/navigation"
import { AlgorthmsSetUp } from "./AlgorthmsSetUp"
import { Button } from "../ui/button"
import { CirclePlus, Play } from "lucide-react"
import { ButtonClose } from "../global/playground/ButtonClose"

export const AlgorthmsStart = () => {
  const { setAlgorithmInProgress, algorithmInProgress } = useAlgorithm()
  const [error, setError] = useState(false)
  const [modal, setModal] = useState(false)
  const route = useRouter()

  const HandleStart = () => {
    if (algorithmInProgress) {
      setModal(true)
    } else {
      setAlgorithmInProgress(false)
      route.push("/algorithms/playground")
    }
  }

  const HandleContinueOrNew = (isNew: boolean) => {
    if (isNew) {
      setAlgorithmInProgress(false)
    }
    route.push("/algorithms/playground")
  }

  return (
    <section className="flex max-w-lg flex-col items-center gap-6">
      <h2>Configura y comienza</h2>
      <p className="text-center text-muted-foreground">
        Selecciona el lenguaje, la dificultad y el tema para crear desafíos que
        se adapten a tus objetivos
      </p>
      <AlgorthmsSetUp error={error} setError={setError} />
      <Button onClick={HandleStart} className="w-full">
        COMENZAR
        <Play className="ml-2" size={16} strokeWidth={2.5} />
      </Button>
      {modal && (
        <dialog open>
          <div>
            <header>
              <h1>Algoritmo en pregreso </h1>
              <ButtonClose onClick={() => setModal(false)} />
            </header>
            <div>
              <p>Ya tienes un algoritmo en progreso</p>
              <p> ¿Deseas seguir con él o empezar de nuevo?</p>
            </div>
            <footer>
              <Button
                variant="secondary"
                onClick={() => HandleContinueOrNew(false)}
              >
                Reanudar
                <Play />
              </Button>
              <Button onClick={() => HandleContinueOrNew(true)}>
                Nuevo
                <CirclePlus />
              </Button>
            </footer>
          </div>
        </dialog>
      )}
    </section>
  )
}
