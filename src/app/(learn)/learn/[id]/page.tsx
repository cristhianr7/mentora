import { generateLessonContent, getLesson } from "@/actions/lesson"
import LessonPage from "@/components/global/lesson"
import React from "react"

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const lesson = await getLesson(params.id)

  if (!lesson) {
    throw new Error("Lesson not found")
  }
  const lessonContent = await generateLessonContent(lesson)
  return <LessonPage lesson={lesson} lessonContent={lessonContent} />
}
