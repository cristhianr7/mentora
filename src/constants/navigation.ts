import { ClipboardList, GraduationCap, Code, UserSearch } from "lucide-react"

export type MenuProps = {
  id: number
  label: string
  icon: keyof typeof IconMap
  path: string
}

export const IconMap = {
  GraduationCap,
  ClipboardList,
  Code,
  UserSearch,
}

export const MENU_ITEMS: MenuProps[] = [
  { id: 0, label: "Cursos", icon: "GraduationCap", path: "courses" },
  { id: 1, label: "Cuestionarios", icon: "ClipboardList", path: "quizz" },
  { id: 2, label: "Desafíos", icon: "Code", path: "challenge" },
  { id: 3, label: "Entrevistas", icon: "UserSearch", path: "interview" },
]
