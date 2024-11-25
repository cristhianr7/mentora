/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useAlgorithm, useSetupQuiz } from "@/lib/store"
import Editor, { loader } from "@monaco-editor/react"
import { IItemCategory } from "@/interfaces/languages"
import { useEffect } from "react"
import { CATEGORIES } from "@/constants/categories"

interface Props {
  language: IItemCategory
}

export function CodeEditor({ language }: Props) {
  const { setAlgorithmSolution, algorithmSolution, currentAlgorithm } =
    useAlgorithm()
  const { category } = useSetupQuiz()

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("myTheme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#121212",
        },
      })
    })
  }, [currentAlgorithm])

  function HandleOnChange(value?: string): void {
    if (value) {
      setAlgorithmSolution({ solution: `${value}` })
    }
  }

  return (
    <div className="space-y-2 rounded-md border p-3">
      <header className="flex items-center space-x-2">
        <span>
          {
            CATEGORIES[category.option as "frontend"].items.find(
              (item) => item.option === language.option,
            )?.logo
          }
        </span>
        <span className="font-semibold">{`MyProject.${language.language.replace("javascript", "js").replace("typescript", "ts")}`}</span>
      </header>
      <Editor
        defaultLanguage={language.language}
        language={language.language}
        value={algorithmSolution.solution}
        theme="myTheme"
        width="100%"
        height="400px"
        options={{
          minimap: { enabled: false },
          contextmenu: true,
          wordWrap: "on",
          automaticLayout: true,
        }}
        onChange={HandleOnChange}
      />
    </div>
  )
}
