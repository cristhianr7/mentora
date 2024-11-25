/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAlgorithm, useSetupQuiz } from "@/lib/store"
import { GetNewAlgorithm } from "@/lib/dataFetch"
import { Loading } from "@/components/global/playground/Loading"
import { Levels } from "@/components/global/playground/Levels"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import Link from "next/link"
import { Workspace } from "@/components/global/playground/Workspace"
import { useRouter } from "next/navigation"
import { BadgePlus, Frown, RefreshCcw, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  const { language, difficulty, categoryAlgorithm } = useSetupQuiz()
  const {
    setAlgorithmSolution,
    algorithmInProgress,
    setAlgorithmInProgress,
    currentAlgorithm,
    setCurrentAlgorithm,
  } = useAlgorithm()
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (algorithmInProgress !== undefined) {
      setLoading(false)
    }
  }, [algorithmInProgress])

  useEffect(() => {
    if (!loading && !algorithmInProgress) {
      GetAlgorithm()
      setAlgorithmInProgress(true)
    }
  }, [loading, algorithmInProgress, loadingResponse])

  const GetAlgorithm = async () => {
    setLoadingResponse(true)
    const response = await GetNewAlgorithm(
      language.option,
      difficulty,
      categoryAlgorithm.option,
    )

    if (!response.error && response.data) {
      setCurrentAlgorithm(response.data)
      setAlgorithmSolution({ solution: `${response.data.codeTemplate}` })
    } else {
      enqueueSnackbar({ message: response.message, variant: "error" })
      setError(true)
    }
    setLoadingResponse(false)
  }

  function HandleRestart(): void {
    setAlgorithmInProgress(false)
    setError(false)
  }

  return (
    <>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      />
      <section className="flex min-h-screen flex-col gap-6 p-6">
        {(!loadingResponse || loading) && !error && (
          <>
            <article className="flex items-center justify-between rounded-lg bg-card p-6 shadow-md">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">
                  {currentAlgorithm.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {currentAlgorithm.tags.map((tag) => (
                    <Badge variant={"secondary"} key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Levels difficulty={difficulty} />
              </div>
              <Button asChild variant={"ghost"}>
                <Link href={"/challenge"} title="Crear un nuevo algoritmo">
                  <BadgePlus className="mr-2" size={16} strokeWidth={2.5} />
                  Crear nuevo algoritmo
                </Link>
              </Button>
            </article>
            <Workspace />
          </>
        )}
        {loadingResponse && !error && (
          <Loading title="Generando algoritmo..." />
        )}
        {error && !loadingResponse && (
          <div className="space-y-4 rounded-lg p-6 text-destructive shadow-md">
            <Frown />
            <div className="space-y-1">
              <p className="font-bold">¡Vaya!</p>
              <p>Mi lógica se enredó y no pude crear el algoritmo.</p>
              <p>¿Reintentamos?</p>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={HandleRestart}
                title="Volver a generar la pregunta"
              >
                Reintentar
                <RefreshCcw />
              </Button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
