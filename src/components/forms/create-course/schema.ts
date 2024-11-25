import { z } from "zod"

import { IconType } from "react-icons"

import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiGo,
  SiRust,
  SiCsharp,
  SiSwift,
  SiRuby,
  SiKotlin,
} from "react-icons/si"
import { FaBook, FaLaptopCode, FaGraduationCap } from "react-icons/fa"
import {
  PiStudentBold,
  PiBooksLight,
  PiCodeLight,
  PiLaptopLight,
} from "react-icons/pi"

import { LANGUAGE, LEARNING_STYLE, LEVEL } from "@prisma/client"

export const languageIcons: Record<LANGUAGE, IconType> = {
  Python: SiPython,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  CPlusPlus: SiCplusplus,
  Go: SiGo,
  Rust: SiRust,
  CSharp: SiCsharp,
  Swift: SiSwift,
  Ruby: SiRuby,
  Kotlin: SiKotlin,
}

export const levelIcons: IconType[] = [
  PiStudentBold,
  PiBooksLight,
  PiCodeLight,
  PiLaptopLight,
]

export const learningStyleIcons: Record<LEARNING_STYLE, IconType> = {
  Theoretical: FaBook,
  Practical: FaLaptopCode,
  Mixed: FaGraduationCap,
}

export const createCourseSchema = z.object({
  style: z.nativeEnum(LEARNING_STYLE),
  level: z.number().min(0).max(3),
  language: z.nativeEnum(LANGUAGE),
})

export type CreateCourseData = z.infer<typeof createCourseSchema>

export const LANGUAGE_LABELS: Record<LANGUAGE, string> = {
  Python: "Python",
  TypeScript: "TypeScript",
  JavaScript: "JavaScript",
  CPlusPlus: "C++",
  Go: "Go",
  Rust: "Rust",
  CSharp: "C#",
  Swift: "Swift",
  Ruby: "Ruby",
  Kotlin: "Kotlin",
}

export const LEARNING_STYLE_LABELS: Record<LEARNING_STYLE, string> = {
  Theoretical: "Teórico",
  Practical: "Práctico",
  Mixed: "Mixto",
}

export const levelGradients: Record<LEVEL, string> = {
  Trainee: "from-cyan-400 via-sky-500 to-blue-600",
  Junior: "from-green-400 via-emerald-500 to-teal-600",
  Middle: "from-yellow-400 via-amber-500 to-orange-600",
  Senior: "from-pink-400 via-rose-500 to-red-600",
}
