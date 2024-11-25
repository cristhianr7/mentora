import {
  PiBooksLight,
  PiCodeLight,
  PiLaptopLight,
  PiStudentBold,
} from "react-icons/pi"
interface Props {
  difficulty: "easy" | "medium" | "hard" | "expert"
}

export function Levels({ difficulty }: Props) {
  return (
    <span className="flex items-center space-x-2">
      {DifficultyLevelIcon[difficulty]}
      <span className="text-sm">{DifficultyLevel[difficulty]}</span>
    </span>
  )
}

const DifficultyLevel = {
  easy: "Trainee",
  medium: "Junior",
  hard: "Semi-Senior",
  expert: "Senior",
}

const DifficultyLevelIcon = {
  easy: <PiStudentBold size={16} strokeWidth={2.5} />,
  medium: <PiBooksLight size={16} strokeWidth={2.5} />,
  hard: <PiCodeLight size={16} strokeWidth={2.5} />,
  expert: <PiLaptopLight size={16} strokeWidth={2.5} />,
}
