import { getCourses } from "@/actions/course"
import { auth } from "@/auth"
import CourseCard from "@/components/global/course/course-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import React from "react"
export default async function Page() {
  const session = await auth()
  const courses = await getCourses(session?.user?.id as string)
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-6 p-6">
      <h1>Cursos</h1>
      <div className="grid grid-cols-1 gap-6 bg-background md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        <Button
          asChild
          className="size-full min-h-[310px] flex-col p-16"
          variant="ghost"
        >
          <Link href="/courses/new">
            <Plus size={64} strokeWidth={2.5} />
            <h2 className="font-bold">Nuevo curso</h2>
          </Link>
        </Button>
      </div>
    </div>
  )
}
