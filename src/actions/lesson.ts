"use server"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { Lesson, Course, Unit } from "@prisma/client"
import { z } from "zod"
import { APICallError, generateObject, RetryError } from "ai"
import { google } from "@ai-sdk/google"

type LessonWithUnitAndCourse = Lesson & {
  unit: Unit & { course: Course }
}

export async function getLesson(id: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }
  const lesson = await db.lesson.findUnique({
    where: { id, unit: { course: { userId: session.user.id } } },
    include: {
      unit: {
        include: {
          course: true,
        },
      },
    },
  })

  return lesson
}

export async function generateLessonContent(lesson: LessonWithUnitAndCourse) {
  const optionSchema = z.object({
    text: z.string(),
    isCorrect: z.boolean(),
    explanation: z.string(),
  })

  const quizSchema = z.object({
    type: z.literal("quiz"),
    question: z.string(),
    codeSnippet: z.string().optional(),
    options: z.array(optionSchema).min(2).max(5),
  })

  const codeExerciseSchema = z.object({
    type: z.literal("codeExercise"),
    title: z.string(),
    description: z.string(),
    codeTemplate: z.string(),
    expectedOutput: z.string(),
    hint: z.string().optional(),
  })

  const theorySchema = z.object({
    type: z.literal("theory"),
    title: z.string(),
    content: z.string(),
  })

  const interactiveExampleSchema = z.object({
    type: z.literal("interactiveExample"),
    title: z.string(),
    description: z.string(),
    code: z.string(),
    explanation: z.string(),
  })

  const lessonContentSchema = z
    .array(
      z.discriminatedUnion("type", [
        quizSchema,
        codeExerciseSchema,
        theorySchema,
        interactiveExampleSchema,
      ]),
    )
    .min(3)
    .max(10)

  try {
    const { object } = await generateObject({
      model: google("gemini-1.5-flash", {
        structuredOutputs: false,
      }),
      system: `Eres un experto diseñador de currículos para cursos de programación, especializado en crear experiencias de aprendizaje interactivas y atractivas similares a Duolingo o Mimo.`,
      maxTokens: 4000,
      maxRetries: 2,
      schema: lessonContentSchema,
      prompt: `Genera contenido para una lección de programación en español, similar al estilo de Duolingo o Mimo, con las siguientes características:

    Configuración:
    - Nivel: ${lesson.unit.course.level}
    - Lenguaje de programación: ${lesson.unit.course.language}
    - Estilo de aprendizaje preferido: ${lesson.unit.course.style}
    - Título de la unidad: ${lesson.unit.title}
    - Título de la lección: ${lesson.title}
    - Posición de la lección en la unidad: ${lesson.position}

    Requisitos:
    1. El contenido debe estar en español.
    2. Crea entre 3 y 10 items de contenido variado (quiz, teoría, ejercicios de código, ejemplos interactivos).
    3. Adapta el contenido al nivel especificado y al estilo de aprendizaje preferido.
    4. Asegúrate de que el contenido sea coherente con el título de la lección y su posición en la unidad.
    5. Incluye explicaciones claras y concisas.
    6. Para ejercicios de código, proporciona plantillas y salidas esperadas.
    7. En los quizzes, incluye al menos una opción correcta y proporciona explicaciones para todas las opciones.
    8. Los niveles pueden ser trainee, junior, middle y senior, de más básico a más avanzado.`,
    })
    console.log(object)

    return object
  } catch (error) {
    console.error(error)
    if (error instanceof APICallError || error instanceof RetryError) {
      throw new Error("Failed to generate course")
    }
    throw error
  }
}
