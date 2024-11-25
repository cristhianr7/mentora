"use client"
import React, { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"

import dynamic from "next/dynamic"

// Importamos Monaco dinámicamente para evitar problemas de SSR
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
})

type Props = {
  lesson: any
  lessonContent: any
}

const languageMap: { [key: string]: string } = {
  Python: "python",
  TypeScript: "typescript",
  JavaScript: "javascript",
  CPlusPlus: "cpp",
  Go: "go",
  Rust: "rust",
  CSharp: "csharp",
  Swift: "swift",
  Ruby: "ruby",
  Kotlin: "kotlin",
}

// Subcomponentes para cada tipo de contenido
const Quiz = ({ data }: any) => (
  <div className="max-w-2xl space-y-4">
    <h2 className="text-2xl font-bold">{data.question}</h2>
    {data.codeSnippet && (
      <pre className="rounded bg-card p-4">
        <code>{data.codeSnippet}</code>
      </pre>
    )}
    <ul className="space-y-2">
      {data.options.map((option: any, index: any) => (
        <li key={index} className="flex items-center space-x-2">
          <input type="radio" id={`option-${index}`} name="quiz-option" />
          <label htmlFor={`option-${index}`}>{option.text}</label>
        </li>
      ))}
    </ul>
  </div>
)

const CodeExercise = ({ data, courseLanguage }: any) => {
  const [code, setCode] = useState(data.codeTemplate)
  const [output, setOutput] = useState("")

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "")
  }

  const handleSubmit = () => {
    // Aquí iría la lógica para ejecutar el código y obtener el output
    // Por ahora, simularemos un output
    setOutput(
      `Executing ${courseLanguage} code...\n${code}\n\nOutput: [Simulated output would appear here]`,
    )
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold">{data.title}</h2>
      <p>{data.description}</p>
      <div className="h-[400px] w-full rounded border border-border">
        <MonacoEditor
          height="100%"
          language={languageMap[courseLanguage] || "plaintext"}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
          }}
        />
      </div>
      {data.hint && (
        <p className="text-sm text-muted-foreground">💡Pista: {data.hint}</p>
      )}
      <Button onClick={handleSubmit}>Run Code</Button>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Output:</h3>
        <pre className="mt-2 whitespace-pre-wrap rounded bg-card p-4">
          {output || "Your code output will appear here after running."}
        </pre>
      </div>
    </div>
  )
}

const Theory = ({ data }: any) => (
  <div className="max-w-2xl space-y-4">
    <h2 className="text-2xl font-bold">{data.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: data.content }} />
  </div>
)

const InteractiveExample = ({ data }: any) => (
  <div className="max-w-2xl space-y-4">
    <h2 className="text-2xl font-bold">{data.title}</h2>
    <p>{data.description}</p>
    <pre className="rounded bg-card p-4">
      <code>{data.code}</code>
    </pre>
    <p>{data.explanation}</p>
  </div>
)

export default function LessonPage({ lesson, lessonContent }: Props) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  const progress = ((currentItemIndex + 1) / lessonContent.length) * 100

  const handleNext = () => {
    if (currentItemIndex < lessonContent.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1)
    }
  }

  const renderContent = (item: any) => {
    switch (item.type) {
      case "quiz":
        return <Quiz data={item} />
      case "codeExercise":
        return (
          <CodeExercise
            data={item}
            courseLanguage={lesson.unit.course.language}
          />
        )
      case "theory":
        return <Theory data={item} />
      case "interactiveExample":
        return <InteractiveExample data={item} />
      default:
        return null
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/courses/${lesson.unit.course.id}`}>
            <X className="size-4" />
          </Link>
        </Button>
      </div>

      <Progress value={progress} className="w-full" />

      <div className="mt-8 flex grow items-center justify-center">
        {renderContent(lessonContent[currentItemIndex])}
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          size={"lg"}
          onClick={handlePrevious}
          disabled={currentItemIndex === 0}
        >
          Previous
        </Button>
        <Button
          size={"lg"}
          onClick={handleNext}
          disabled={currentItemIndex === lessonContent.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
