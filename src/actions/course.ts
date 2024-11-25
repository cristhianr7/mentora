"use server"
import { z } from "zod"
import { google } from "@ai-sdk/google"
import { APICallError, RetryError, generateObject } from "ai"
import { LEARNING_STYLE, LANGUAGE, LEVEL } from "@prisma/client"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function createCourse(formData: FormData) {
  const formSchema = z.object({
    style: z.nativeEnum(LEARNING_STYLE),
    level: z.nativeEnum(LEVEL),
    language: z.nativeEnum(LANGUAGE),
  })

  const lessonSchema = z.object({
    title: z.string(),
  })

  const projectSchema = z.object({
    title: z.string(),
    explanation: z.string(),
  })

  const unitSchema = z.object({
    title: z.string(),
    lessons: z.array(lessonSchema).min(3).max(10),
    project: projectSchema,
  })

  const courseStructureSchema = z.object({
    units: z.array(unitSchema).min(3).max(10),
  })

  console.log("Creating course")

  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  console.log(session)

  const validatedFields = formSchema.safeParse({
    style: formData.get("style"),
    level: formData.get("level"),
    language: formData.get("language"),
  })

  if (!validatedFields.success) {
    throw new Error("Invalid form data")
  }

  const { style, level, language } = validatedFields.data
  console.log(style, level, language)

  try {
    const { object } = await generateObject({
      model: google("gemini-1.5-flash", {
        structuredOutputs: false,
      }),
      system: `Eres un experto diseñador de currículos para cursos de programación, especializado en crear experiencias de aprendizaje interactivas y atractivas similares a Duolingo o Mimo.`,
      maxTokens: 2000,
      maxRetries: 2,
      schema: courseStructureSchema,
      prompt: `Genera una estructura de curso de programación en español, similar al estilo de Duolingo o Mimo, con las siguientes características:

**Configuración:**
* Nivel: ${level}
* Lenguaje de programación: ${language}
* Estilo de aprendizaje preferido: ${style}

**Requisitos:**
1. El curso debe estar en español.
2. Diseña unidades cortas y enfocadas, cada una con 3-10 lecciones.
3. Incluye una mezcla de lecciones teóricas y prácticas.
4. Asegúrate de que haya al menos un proyecto por unidad para aplicar lo aprendido.
5. Las lecciones deben ser adecuadas para sesiones cortas de aprendizaje.
6. Cada leccion luego podrá tener 3-10 items entre quiz, texto, ejercicios de código, etc.
7. Adapta el contenido al nivel especificado (${level}) y al estilo de aprendizaje preferido (${style}).
8. Sigue una progresión lógica de conceptos, desde lo básico hasta lo más avanzado.

Estructura cada unidad para que construya sobre la anterior, introduciendo nuevos conceptos gradualmente. Asegúrate de que los proyectos sean desafiantes pero alcanzables para el nivel del estudiante.`,
    })
    console.log(object)

    const course = await db.course.create({
      data: {
        userId: session.user.id,
        language,
        level,
        style,
        units: {
          create: object.units.map(
            (unit: z.infer<typeof unitSchema>, unitIndex: number) => ({
              title: unit.title,
              position: unitIndex + 1,
              lessons: {
                create: unit.lessons.map((lesson, lessonIndex: number) => ({
                  title: lesson.title,
                  position: lessonIndex + 1,
                })),
              },
              projects: {
                create: {
                  title: unit.project.title,
                  explanation: unit.project.explanation,
                },
              },
            }),
          ),
        },
      },
      include: {
        units: {
          include: {
            lessons: true,
            projects: true,
          },
        },
      },
    })

    redirect(`/courses/${course.id}`)
  } catch (error) {
    console.error(error)
    if (error instanceof APICallError || error instanceof RetryError) {
      throw new Error("Failed to generate course")
    }
    throw error
  }
}

export async function getCourse(id: string) {
  const course = await db.course.findUnique({
    where: { id },
    include: {
      units: {
        include: {
          lessons: true,
          projects: true,
        },
      },
    },
  })

  if (!course) {
    throw new Error("Course not found")
  }

  return course
}

export async function getCourses(userId: string) {
  const courses = await db.course.findMany({
    where: { userId },
    include: {
      units: {
        include: {
          lessons: true,
          projects: true,
        },
      },
    },
  })

  return courses
}
