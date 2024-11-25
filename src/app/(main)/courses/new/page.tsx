import CreateCourse from "@/components/forms/create-course"
import React from "react"

export default function Page() {
  return (
    <div className="mx-auto flex size-full min-h-[calc(100vh-80px)] max-w-screen-lg flex-col items-center gap-6 p-6 sm:min-h-screen">
      <h1 className="hidden text-center sm:inline">
        Crea un nuevo curso con IA✨
      </h1>
      <CreateCourse />
    </div>
  )
}
