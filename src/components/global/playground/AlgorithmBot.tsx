/* eslint-disable react-hooks/exhaustive-deps */
import { Message, useChat } from "ai/react"
import { Fragment, useEffect, useRef } from "react"
import { CodeBlock, atomOneDark } from "react-code-blocks"
import { useAlgorithm, useSetupQuiz } from "@/lib/store"
import { GetCodeBlock, parseTextToJSX } from "./ParseTextToJSX"
import { IAlgorithm } from "@/interfaces/algorithm"
import { StyleCodeEditor } from "@/constants/categories"
import { Bot, Send, StopCircle, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Props {
  algorithm: IAlgorithm
  evaluate: boolean
}

export function AlgorithmBot({ algorithm, evaluate }: Props) {
  const { language } = useSetupQuiz()
  const { algorithmSolution } = useAlgorithm()
  const {
    messages,
    handleSubmit,
    handleInputChange,
    input,
    isLoading,
    stop,
    append,
  } = useChat()
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages]) // Dependency on messages to run whenever they change

  useEffect(() => {
    const prevMessages: Message[] = [
      {
        role: "assistant",
        content: algorithm.title,
        id: crypto.randomUUID(),
      },
      {
        role: "assistant",
        content: algorithm.explanation,
        id: crypto.randomUUID(),
      },
      {
        role: "user",
        content: "Voy a resolver y calificaras mi respuesta",
        id: crypto.randomUUID(),
      },
    ]
    messages.push(...prevMessages)
  }, [])

  useEffect(() => {
    if (evaluate) {
      const prevMessages: Message = {
        role: "user",
        content: `Evalúa mi código brevemente, sin darme solución: ${algorithmSolution.solution}`,
        id: crypto.randomUUID(),
      }

      append(prevMessages)
    }
  }, [evaluate])

  return (
    <ScrollArea className="size-full">
      <section className="flex size-full flex-col gap-6">
        <article className="flex flex-col gap-3" ref={chatContainerRef}>
          {messages
            .filter((_, index) => index > 2)
            .map((message) => (
              <Fragment key={message.id}>
                {
                  <div className="flex gap-3 rounded-md bg-accent p-3">
                    <span>
                      {message.role === "user" ? (
                        <User size={32} strokeWidth={2.5} />
                      ) : (
                        <Bot size={32} strokeWidth={2.5} />
                      )}
                      {/*message.role === 'user' ? 'Yo' : 'QuizBot'*/}
                    </span>

                    <div>
                      {message.content.includes("Evalúa mi código")
                        ? "Evalúa mi código"
                        : parseTextToJSX(message.content)}
                      {GetCodeBlock(message.content) && (
                        <CodeBlock
                          language={language.language}
                          showLineNumbers={false}
                          text={GetCodeBlock(message.content) || ""}
                          theme={atomOneDark}
                          customStyle={{ ...StyleCodeEditor }}
                        />
                      )}
                    </div>
                  </div>
                }
              </Fragment>
            ))}
        </article>
        <form onSubmit={handleSubmit} className="flex gap-3 justify-self-end">
          <Input
            type="search"
            name="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder="¿En qué puedo ayudarte? Escribe aquí..."
          />
          {!isLoading && (
            <Button
              size={"icon"}
              variant={"outline"}
              type="submit"
              disabled={isLoading}
            >
              <Send size={16} strokeWidth={2.5} />
            </Button>
          )}
          {isLoading && (
            <button type="button" onClick={() => stop()}>
              <StopCircle />
            </button>
          )}
        </form>
      </section>
    </ScrollArea>
  )
}
