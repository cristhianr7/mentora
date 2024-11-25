/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select"
import { Dispatch, SetStateAction, useEffect } from "react"
import { AlgorithmsCategories, CATEGORIES } from "@/constants/categories"
import { useSetupQuiz } from "@/lib/store"
import {
  PiBooksLight,
  PiCodeLight,
  PiLaptopLight,
  PiStudentBold,
} from "react-icons/pi"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

interface Props {
  error: boolean
  setError: Dispatch<SetStateAction<boolean>>
}

export function AlgorthmsSetUp({ error, setError }: Props) {
  const {
    language,
    setLanguage,
    setDifficulty,
    difficulty,
    categoryAlgorithm,
    setCategoryAlgorith,
  } = useSetupQuiz()

  const HandleChangeDifficulty = (
    value: "easy" | "medium" | "hard" | "expert",
  ) => {
    setDifficulty(value)
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex w-full flex-col gap-2">
          <Label>Categoria</Label>
          <Select
            value={categoryAlgorithm?.option}
            onValueChange={(value) => {
              const selectCategory = AlgorithmsCategories.find(
                (item) => item.option === value,
              )
              if (selectCategory) {
                setCategoryAlgorith(selectCategory)
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {AlgorithmsCategories.map((category) => (
                <SelectItem key={category.option} value={category.option}>
                  {category.option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label>Lenguaje</Label>
          <Select
            value={language?.option}
            onValueChange={(value) => {
              const selectLanguage = CATEGORIES.languages.items.find(
                (item) => item.option === value,
              )
              if (selectLanguage) {
                setLanguage(selectLanguage)
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.languages.items.map((lang) => (
                <SelectItem key={lang.option} value={lang.option}>
                  {lang.option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <Label>Dificultad</Label>
        <div className="flex w-full justify-between">
          <Button
            onClick={() => HandleChangeDifficulty("easy")}
            variant={"outline"}
            className={difficulty === "easy" ? "bg-accent" : ""}
          >
            <PiStudentBold size={16} strokeWidth={2.5} className="mr-2" />
            Trainee
          </Button>
          <Button
            onClick={() => HandleChangeDifficulty("medium")}
            variant={"outline"}
            className={difficulty === "medium" ? "bg-accent" : ""}
          >
            <PiBooksLight size={16} strokeWidth={2.5} className="mr-2" />
            Junior
          </Button>
          <Button
            onClick={() => HandleChangeDifficulty("hard")}
            variant={"outline"}
            className={difficulty === "hard" ? "bg-accent" : ""}
          >
            <PiCodeLight size={16} strokeWidth={2.5} className="mr-2" />
            Semi-Senior
          </Button>
          <Button
            onClick={() => HandleChangeDifficulty("expert")}
            variant={"outline"}
            className={difficulty === "expert" ? "bg-accent" : ""}
          >
            <PiLaptopLight size={16} strokeWidth={2.5} className="mr-2" />
            Senior
          </Button>
        </div>
      </div>
    </div>
  )
}
