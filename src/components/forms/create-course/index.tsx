"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft } from "lucide-react"
import {
  CreateCourseData,
  createCourseSchema,
  LANGUAGE_LABELS,
  languageIcons,
  LEARNING_STYLE_LABELS,
  learningStyleIcons,
  levelIcons,
} from "./schema"
import { LANGUAGE, LEARNING_STYLE, LEVEL } from "@prisma/client"
import { createCourse } from "@/actions/course"

export default function CreateCourse() {
  const [step, setStep] = useState(1)
  const form = useForm<CreateCourseData>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      style: undefined,
      level: 0,
      language: undefined,
    },
  })

  async function onSubmit(values: CreateCourseData) {
    const formData = new FormData()
    formData.append("style", values.style)
    formData.append("level", Object.values(LEVEL)[values.level])
    formData.append("language", values.language)

    try {
      await createCourse(formData)
    } catch (error) {
      console.error(error)
      // Handle error (e.g., show error message to user)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-md grow flex-col justify-center space-y-12"
      >
        {step === 1 && (
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <h3 className="text-center">
                  ¿Cuál es tu estilo de aprendizaje preferido?
                </h3>
                <FormControl>
                  <div className="flex flex-col gap-3">
                    {(Object.keys(LEARNING_STYLE) as LEARNING_STYLE[]).map(
                      (key) => {
                        const Icon = learningStyleIcons[key]
                        return (
                          <Button
                            key={key}
                            type="button"
                            variant={
                              field.value === key ? "default" : "outline"
                            }
                            onClick={() => {
                              field.onChange(key)
                              nextStep()
                            }}
                            size="lg"
                            className="border-2"
                          >
                            <Icon className="mr-3" size={24} />
                            {LEARNING_STYLE_LABELS[key]}
                          </Button>
                        )
                      },
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {step === 2 && (
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <h3 className="text-center">
                  ¿Cuánta experiencia tienes programando?
                </h3>
                <FormControl>
                  <div>
                    <div className="flex justify-center">
                      {React.createElement(levelIcons[field.value], {
                        size: 128,
                        className: "text-primary",
                      })}
                    </div>
                    <div className="flex justify-between">
                      {Object.values(LEVEL).map((level, index) => (
                        <span
                          key={level}
                          onClick={() => field.onChange(index)}
                          className={`cursor-pointer py-3 text-sm font-semibold ${
                            index === field.value
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                    <Slider
                      min={0}
                      max={3}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {step === 3 && (
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <h3 className="text-center">
                  ¿Qué lenguaje de programación quieres aprender?
                </h3>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 gap-3"
                  >
                    {(Object.keys(LANGUAGE) as LANGUAGE[]).map((key) => {
                      const Icon = languageIcons[key]
                      return (
                        <FormItem key={key}>
                          <FormControl>
                            <RadioGroupItem
                              value={key}
                              className="peer sr-only"
                              id={`language-${key}`}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={`language-${key}`}
                            className="flex flex-col items-center justify-between rounded-md border-2 border-input bg-card p-3 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Icon className="mb-3" size={32} />
                            {LANGUAGE_LABELS[key]}
                          </FormLabel>
                        </FormItem>
                      )
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-between">
          {step > 1 && (
            <Button type="button" variant="ghost" size="lg" onClick={prevStep}>
              <ArrowLeft className="mr-2 size-4" /> Regresar
            </Button>
          )}
          {step === 2 && (
            <Button
              type="button"
              onClick={nextStep}
              size="lg"
              className="ml-auto"
            >
              Continuar
            </Button>
          )}
          {step === 3 && (
            <Button type="submit" className="ml-auto" size="lg">
              Crear Curso
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
