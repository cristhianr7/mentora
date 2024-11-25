import { Button } from "@/components/ui/button"
import { CodeEditor } from "./CodeEditor"
import { AlgorithmBot } from "./AlgorithmBot"
import { useAlgorithm, useSetupQuiz } from "@/lib/store"
import { IOutputRun } from "@/interfaces/languages"
import { useState, MouseEvent } from "react"
import { RunCode } from "@/lib/dataFetch"
import { parseTextToJSX } from "./ParseTextToJSX"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { StyleCodeEditor } from "@/constants/categories"
import { Separator } from "@/components/ui/separator"
import { Check, CirclePlay, Lightbulb, NotebookText } from "lucide-react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function Workspace() {
  const { language } = useSetupQuiz()
  const { algorithmSolution, currentAlgorithm } = useAlgorithm()
  const [evaluate, setEvaluate] = useState(false)
  const [output, setOutput] = useState<IOutputRun>({
    code: 0,
    output: "Suerte 🍀",
    signal: "",
    stderr: "",
    stdout: "",
  })

  function HandleEvaluate(event: MouseEvent<HTMLButtonElement>): void {
    setEvaluate(true)
    setTimeout(() => {
      setEvaluate(false)
    }, 500)
  }

  const HandleRunCode = async () => {
    setOutput({
      code: -135,
      output: "[RUN] Ejecutando código...",
      signal: "",
      stderr: "",
      stdout: "",
    })
    const response = await RunCode(
      language.language,
      algorithmSolution.solution,
      language.version,
    )

    if (response.response?.run.code === 1 && response.response?.run.stderr) {
      setOutput(response.response?.run)
    } else {
      if (response.response) setOutput(response.response?.run)
    }
  }

  return (
    <article className="h-full space-y-4 rounded-lg bg-card p-6 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"}>
                <Lightbulb size={16} strokeWidth={2.5} className="mr-2" />
                Explicación
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-xl font-semibold">
                {currentAlgorithm.title}
              </h3>
              <p>
                {parseTextToJSX(
                  currentAlgorithm.explanation.replaceAll("\\n", "\n"),
                )}
              </p>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"}>
                <NotebookText size={16} strokeWidth={2.5} className="mr-2" />
                Ejemplo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <span className="font-semibold">Ejemplo:</span>
              <div className="space-y-2">
                <span className="font-medium">Datos de entrada</span>
                <span>{currentAlgorithm.inputDescription}</span>
                <CodeBlock
                  language={language.language}
                  text={currentAlgorithm.exampleInputs
                    .join("\\n")
                    .replaceAll("\\n", "\n")
                    .replaceAll("\\t", "\t")
                    .replaceAll("\\", "")}
                  theme={atomOneDark}
                  customStyle={StyleCodeEditor}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <span className="font-medium">Resultado esperado</span>
                <span>{currentAlgorithm.outputDescription}</span>
                <CodeBlock
                  language={language.language}
                  text={currentAlgorithm.exampleOutputs
                    .join("\\n")
                    .replaceAll("\\n", "\n")
                    .replaceAll("\\t", "\t")
                    .replaceAll("\\", "")}
                  theme={atomOneDark}
                  customStyle={StyleCodeEditor}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Button onClick={HandleRunCode}>
          <CirclePlay size={16} strokeWidth={2.5} className="mr-2" />
          RUN
        </Button>

        <Button onClick={HandleEvaluate}>
          <Check size={16} strokeWidth={2.5} className="mr-2" />
          Evaluar Solución
        </Button>
      </div>
      <div className="flex justify-between gap-6">
        <div className="flex size-full flex-col gap-6">
          <CodeEditor language={language} />
          <textarea
            value={output.output.replaceAll(
              /\/piston\/jobs\/[a-f0-9\-]{36}\/file0./g,
              "",
            )}
            spellCheck={false}
            readOnly
            className="size-full min-h-40 rounded-md border p-3"
          />
        </div>
        <AlgorithmBot algorithm={currentAlgorithm} evaluate={evaluate} />
      </div>
    </article>
  )
}
