import React from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

import {
  languageIcons,
  levelIcons,
  LANGUAGE_LABELS,
  levelGradients,
} from "@/components/forms/create-course/schema"

import { Course, Unit, Lesson, Project, LEVEL } from "@prisma/client"

type CourseCardProps = {
  course: Course & {
    units: (Unit & {
      lessons: Lesson[]
      projects: Project[]
    })[]
  }
}

export default function CourseCard({ course }: CourseCardProps) {
  const LanguageIcon = languageIcons[course.language]
  const LevelIcon = levelIcons[Object.values(LEVEL).indexOf(course.level)]

  const totalLessons = course.units.reduce(
    (total, unit) => total + unit.lessons.length,
    0,
  )
  const completedLessons = course.units.reduce(
    (total, unit) =>
      total + unit.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="group overflow-hidden rounded-3xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            {LANGUAGE_LABELS[course.language]}
          </CardTitle>
          <Badge
            variant="outline"
            className={`h-8 w-fit gap-1 bg-gradient-to-br px-3 font-bold capitalize text-white ${levelGradients[course.level]}`}
          >
            <LevelIcon size={20} />
            {course.level}
          </Badge>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div
            className={`rounded-full bg-gradient-to-br p-8 ${levelGradients[course.level]}`}
          >
            <LanguageIcon
              className="text-white transition-all duration-300 group-hover:scale-110"
              size={64}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-3">
          <div className="flex w-full justify-between text-sm">
            <span className="font-medium">{course.units.length} Unidades</span>
            <span className="font-medium">
              {completedLessons}/{totalLessons} Lecciones
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </CardFooter>
      </Card>
    </Link>
  )
}
