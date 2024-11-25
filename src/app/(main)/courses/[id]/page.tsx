import React from "react"
import { getCourse } from "@/actions/course"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  Code,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  languageIcons,
  levelGradients,
} from "@/components/forms/create-course/schema"
import Link from "next/link"

type Props = {
  params: {
    id: string
  }
}

const UnitIcon = ({ isCompleted }: { isCompleted: boolean }) =>
  isCompleted ? (
    <CheckCircle2 size={24} className="text-primary" />
  ) : (
    <Circle size={24} className="text-border" />
  )

const LessonButton = ({ lesson }: { lesson: any; isLastItem: boolean }) => (
  <Button
    variant="outline"
    className="justify-start overflow-hidden px-6"
    size="lg"
    asChild
  >
    <Link href={`/learn/${lesson.id}`} className="flex w-full items-center">
      <div className="mr-2 shrink-0">
        {lesson.completed ? (
          <CheckCircle2 size={16} className="text-primary" />
        ) : (
          <BookOpen size={16} />
        )}
      </div>
      <span className="grow truncate text-left">{lesson.title}</span>
      <ChevronRight size={16} className="ml-2 shrink-0" />
    </Link>
  </Button>
)

const ProjectButton = ({ project }: { project: any; isLastItem: boolean }) => (
  <Button
    variant="outline"
    className="justify-start overflow-hidden px-6"
    size="lg"
  >
    <div className="flex w-full items-center">
      <Code size={16} className="mr-2 shrink-0" />
      <span className="grow truncate text-left">Proyecto: {project.title}</span>
      <ChevronRight size={16} className="ml-2 shrink-0" />
    </div>
  </Button>
)

export default async function Page({ params }: Props) {
  const course = await getCourse(params.id)
  const LanguageIcon = languageIcons[course.language]
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-6 p-6 xl:flex-row">
      <Accordion
        type="single"
        collapsible
        className="flex w-full flex-col gap-6"
      >
        {course.units.map((unit, index) => {
          const isUnitCompleted = unit.lessons.every(
            (lesson) => lesson.completed,
          )
          const isLastUnit = index === course.units.length - 1

          return (
            <AccordionItem
              key={unit.id}
              value={unit.id}
              className="relative border-none"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  {!isLastUnit && (
                    <div
                      className={`absolute left-6 top-12 z-50 h-full w-0.5 -translate-x-1/2 translate-y-1 ${
                        isUnitCompleted ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                  <div className="flex w-fit items-center gap-3 rounded-md bg-primary/15 p-3">
                    <UnitIcon isCompleted={isUnitCompleted} />
                    <p className="text-base">{"Unidad " + unit.position}</p>
                  </div>
                  <h3 className="ml-12 text-start leading-none md:ml-3">
                    {unit.title}
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-12 flex flex-col gap-3 pb-6">
                {unit.lessons.map((lesson, lessonIndex) => (
                  <LessonButton
                    key={lesson.id}
                    lesson={lesson}
                    isLastItem={
                      lessonIndex === unit.lessons.length - 1 &&
                      unit.projects.length === 0
                    }
                  />
                ))}
                {unit.projects.map((project, projectIndex) => (
                  <ProjectButton
                    key={project.id}
                    project={project}
                    isLastItem={projectIndex === unit.projects.length - 1}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      <Card className="hidden h-fit xl:block xl:min-w-80">
        <CardHeader>
          <CardTitle>Información del Curso</CardTitle>
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

        <CardFooter>
          <div className="space-y-2">
            <p>
              <strong>Lenguaje:</strong> {course.language}
            </p>
            <p>
              <strong>Nivel:</strong> {course.level}
            </p>
            <p>
              <strong>Estilo de aprendizaje:</strong> {course.style}
            </p>
            <p>
              <strong>Unidades:</strong> {course.units.length}
            </p>
            <p>
              <strong>Proyectos:</strong>{" "}
              {course.units.reduce(
                (sum, unit) => sum + unit.projects.length,
                0,
              )}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
