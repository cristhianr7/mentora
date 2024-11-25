import { IItemCategory } from "../interfaces/languages"
import { IAlgorithmProperty } from "../interfaces/algorithm"
import { IQuestionCategory } from "../interfaces/quiz"

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
  SiNextdotjs,
  SiPhp,
  SiSqlalchemy,
  SiLua,
  SiPerl,
  SiDart,
  SiScala,
  SiHtml5,
  SiCss3,
  SiReact,
  SiAngular,
  SiVuedotjs,
  SiNuxtdotjs,
  SiBootstrap,
  SiTailwindcss,
  SiSass,
  SiNodedotjs,
  SiDjango,
  SiFlask,
  SiExpress,
  SiLaravel,
  SiSpring,
} from "react-icons/si"
import { Book } from "lucide-react"

export const CATEGORIES = {
  types: {
    items: [
      {
        option: "languages",
        value: "Lenguajes",
        functionSyntax: `<!--does not support functions -->`,
        color: "#E34F26",
        logo: <SiPython />,
        language: "",
        version: "",
      },
      {
        option: "frontend",
        value: "Front-End",
        functionSyntax: `<!--does not support functions -->`,
        color: "#E34F26",
        logo: <SiNextdotjs />,
        language: "",
        version: "",
      },
      {
        option: "backend",
        value: "Back-End",
        functionSyntax: `<!--does not support functions -->`,
        color: "#E34F26",
        logo: <SiNextdotjs />,
        language: "",
        version: "",
      },
    ],
  },
  languages: {
    items: [
      {
        option: "javascript",
        value: "JavaScript",
        language: "javascript",
        functionSyntax: `function myFunction() {\n\treturn false;\n}`,
        color: "#F7DF1E",
        logo: <SiJavascript />,
        version: "18.15.0",
      },
      {
        option: "python",
        value: "Python",
        language: "python",
        functionSyntax: `def myFunction():\n\treturn False`,
        color: "#3776AB",
        logo: <SiPython />,
        version: "3.10.0",
      },
      {
        option: "cpp",
        value: "C++",
        language: "cpp",
        functionSyntax: `namespace MyNamespace {\n\tbool myFunction() {\n\t\treturn false;\n\t}\n}`,
        color: "#00599C",
        logo: <SiCplusplus />,
        version: "10.2.0",
      },
      {
        option: "csharp",
        value: "C#",
        language: "csharp",
        functionSyntax: `namespace MyNamespace {\n\tclass Program {\n\t\tpublic bool myFunction() {\n\t\t\treturn false;\n\t\t}\n\t}\n}`,
        color: "#239120",
        logo: <SiCsharp />,
        version: "6.12.0",
      },
      {
        option: "ruby",
        value: "Ruby",
        language: "ruby",
        functionSyntax: `module MyModule\n\tdef myFunction\n\t\tfalse\n\tend\nend`,
        color: "#CC342D",
        logo: <SiRuby />,
        version: "3.0.1",
      },
      {
        option: "php",
        value: "PHP",
        language: "php",
        functionSyntax: `<?php\nfunction myFunction() {\n\treturn false;\n}`,
        color: "#777BB4",
        logo: <SiPhp />,
        version: "8.2.3",
      },
      {
        option: "typescript",
        value: "TypeScript",
        language: "typescript",
        functionSyntax: `function myFunction(): boolean {\n\treturn false;\n}`,
        color: "#3178C6",
        logo: <SiTypescript />,
        version: "5.0.3",
      },
      {
        option: "swift",
        value: "Swift",
        language: "swift",
        functionSyntax: `class MyClass {\n\tfunc myFunction() -> Bool {\n\t\treturn false\n\t}\n}`,
        color: "#FA7343",
        logo: <SiSwift />,
        version: "5.3.3",
      },
      {
        option: "kotlin",
        value: "Kotlin",
        language: "kotlin",
        functionSyntax: `class MyClass {\n\tfun myFunction(): Boolean {\n\t\treturn false\n\t}\n}`,
        color: "#0095D5",
        logo: <SiKotlin />,
        version: "1.8.20",
      },
      {
        option: "go",
        value: "Go",
        language: "go",
        functionSyntax: `package main\n\nfunc myFunction() bool {\n\treturn false\n}`,
        color: "#00ADD8",
        logo: <SiGo />,
        version: "1.16.2",
      },
      {
        option: "rs",
        value: "Rust",
        language: "rust",
        functionSyntax: `mod my_module {\n\tpub fn myFunction() -> bool {\n\t\tfalse\n\t}\n}`,
        color: "#DEA584",
        logo: <SiRust />,
        version: "1.68.2",
      },
      {
        option: "dart",
        value: "Dart",
        language: "dart",
        functionSyntax: `class MyClass {\n\tbool myFunction() {\n\t\treturn false;\n\t}\n}`,
        color: "#0175C2",
        logo: <SiDart />,
        version: "2.19.6",
      },
      {
        option: "scala",
        value: "Scala",
        language: "scala",
        functionSyntax: `object MyObject {\n\tdef myFunction(): Boolean = {\n\t\tfalse\n\t}\n}`,
        color: "#DC322F",
        logo: <SiScala />,
        version: "3.2.2",
      },
      {
        option: "perl",
        value: "Perl",
        language: "perl",
        functionSyntax: `package MyPackage;\n\nsub myFunction {\n\treturn 0;\n}`,
        color: "#39457E",
        logo: <SiPerl />,
        version: "5.36.0",
      },
      {
        option: "lua",
        value: "Lua",
        language: "lua",
        functionSyntax: `function myFunction()\n\treturn false\nend`,
        color: "#3737f9",
        logo: <SiLua />,
        version: "5.4.4",
      },
      {
        option: "sql",
        value: "SQL",
        language: "sql",
        functionSyntax: `-- SQL does not support functions in the same way\n-- Example for a stored procedure\nCREATE PROCEDURE myFunction()\nAS\nBEGIN\n\tSELECT 0 AS Result;\nEND`,
        color: "#E38C00",
        logo: <SiSqlalchemy />,
        version: "3.36.0",
      },
    ],
  },
  frontend: {
    items: [
      {
        option: "html",
        value: "HTML",
        functionSyntax: `<!-- HTML does not support functions -->`,
        color: "#E34F26",
        logo: <SiHtml5 />,
        language: "html",
        version: "",
      },
      {
        option: "css",
        value: "CSS",
        functionSyntax: `/* CSS does not support functions */`,
        color: "#1572B6",
        logo: <SiCss3 />,
        language: "css",
        version: "",
      },
      {
        option: "reactjs",
        value: "React",
        functionSyntax: `function myFunction() {\n\treturn false;\n}`,
        color: "#61DAFB",
        logo: <SiReact />,
        language: "jsx",
        version: "",
      },
      {
        option: "angular",
        value: "Angular",
        functionSyntax: `function myFunction() {\n\treturn false;\n}`,
        color: "#DD0031",
        logo: <SiAngular />,
        language: "tsx",
        version: "",
      },
      {
        option: "vuejs",
        value: "Vue.js",
        functionSyntax: `function myFunction() {\n\treturn false;\n}`,
        color: "#4FC08D",
        logo: <SiVuedotjs />,
        language: "jsx",
        version: "",
      },
      {
        option: "nextjs",
        value: "Next.js",
        functionSyntax: `function myFunction() {\n\treturn false;\n}`,
        color: "#f4f4f4",
        logo: <SiNextdotjs />,
        language: "jsx",
        version: "",
      },
      {
        option: "nuxtjs",
        value: "Nuxt.js",
        functionSyntax: `function myFunction() {\n\treturn false;\n}`,
        color: "#00C58E",
        logo: <SiNuxtdotjs />,
        language: "tsx",
        version: "",
      },
      {
        option: "bootstrap",
        value: "Bootstrap",
        functionSyntax: `/* Bootstrap does not support functions */`,
        color: "#7952B3",
        logo: <SiBootstrap />,
        language: "css",
        version: "",
      },
      {
        option: "tailwindcss",
        value: "Tailwind CSS",
        functionSyntax: `/* Tailwind CSS does not support functions */`,
        color: "#38B2AC",
        logo: <SiTailwindcss />,
        language: "css",
        version: "",
      },
      {
        option: "sass",
        value: "Sass",
        functionSyntax: `/* Sass does not support functions */`,
        color: "#CC6699",
        logo: <SiSass />,
        language: "sass",
        version: "",
      },
    ],
  },
  backend: {
    items: [
      {
        option: "nodejs",
        value: "Node.js",
        functionSyntax: `function myFunction() {\n\treturn false;\n}`,
        color: "#339933",
        logo: <SiNodedotjs />,
        language: "javascript",
        version: "",
      },
      {
        option: "django",
        value: "Django",
        functionSyntax: `def myFunction():\n\treturn False`,
        color: "#0c704a",
        logo: <SiDjango />,
        language: "python",
        version: "",
      },
      {
        option: "flask",
        value: "Flask",
        functionSyntax: `def myFunction():\n\treturn False`,
        color: "#ffffff",
        logo: <SiFlask />,
        language: "python",
        version: "",
      },
      {
        option: "expressjs",
        value: "Express.js",
        functionSyntax: `function myFunction() {\n\treturn false;\n}`,
        color: "#ffffff",
        logo: <SiExpress />,
        language: "javascript",
        version: "",
      },
      {
        option: "laravel",
        value: "Laravel",
        functionSyntax: `<?php\nfunction myFunction() {\n\treturn false;\n}`,
        color: "#FF2D20",
        logo: <SiLaravel />,
        language: "php",
        version: "",
      },
      {
        option: "spring",
        value: "Spring",
        functionSyntax: `public class Main {\n\tpublic static boolean myFunction() {\n\t\treturn false;\n\t}\n}`,
        color: "#6DB33F",
        logo: <SiSpring />,
        language: "",
        version: "",
      },
    ],
  },
}

export const AlgorithmsCategories: Array<IAlgorithmProperty> = [
  {
    option: "Search",
    value: "Búsqueda",
  },
  {
    option: "Sorting",
    value: "Ordenamiento",
  },
  {
    option: "Recursion",
    value: "Recursividad",
  },
  {
    option: "Greedy",
    value: "Greedy (Avaro)",
  },
  {
    option: "Graph Theory",
    value: "Teoría de Grafos",
  },
  {
    option: "Dynamic Programming",
    value: "Programación Dinámica",
  },
  {
    option: "Backtracking",
    value: "Backtracking",
  },
  {
    option: "Divide and Conquer",
    value: "División y Conquista",
  },
  {
    option: "Optimization",
    value: "Optimización",
  },
  {
    option: "Computational Geometry",
    value: "Geometría Computacional",
  },
  {
    option: "Encryption and Cryptography",
    value: "Cifrado y Criptografía",
  },
  {
    option: "String Algorithms",
    value: "Cadenas de Texto",
  },
  {
    option: "Random Numbers",
    value: "Números Aleatorios",
  },
  {
    option: "Compression Algorithms",
    value: "Algoritmos de Compresión",
  },
  {
    option: "Bit Manipulation",
    value: "Manipulación de Bits",
  },
  {
    option: "Number Theory",
    value: "Teoría de Números",
  },
  {
    option: "Mathematical Puzzles",
    value: "Rompecabezas Matemáticos",
  },
  {
    option: "Pattern Matching",
    value: "Coincidencia de Patrones",
  },
  {
    option: "Iterative Algorithms",
    value: "Algoritmos Iterativos",
  },
  {
    option: "Data Structures",
    value: "Estructuras de Datos",
  },
  {
    option: "String Manipulation",
    value: "Manipulación de Cadenas",
  },
  {
    option: "Heuristics",
    value: "Heurística",
  },
  {
    option: "Game Theory",
    value: "Teoría de Juegos",
  },
  {
    option: "Approximation Algorithms",
    value: "Algoritmos de Aproximación",
  },
  {
    option: "Monte Carlo Algorithms",
    value: "Algoritmos de Monte Carlo",
  },
  {
    option: "Simulated Annealing",
    value: "Recocido Simulado",
  },
  {
    option: "Network Flow Algorithms",
    value: "Algoritmos de Flujo de Redes",
  },
  {
    option: "Probabilistic Algorithms",
    value: "Algoritmos Probabilísticos",
  },
]

export const ProgrammingCategories: {
  languages: Array<IQuestionCategory>
  frontend: Array<IQuestionCategory>
  backend: Array<IQuestionCategory>
} = {
  languages: [
    {
      option: "Syntax and Structure",
      value: "Syntax and Structure",
    },
    {
      option: "Basic Programming Concepts",
      value: "Basic Programming Concepts",
    },
    {
      option: "Algorithms and Logic",
      value: "Algorithms and Logic",
    },
    {
      option: "Control Structures",
      value: "Control Structures",
    },
    {
      option: "Data Structures",
      value: "Data Structures",
    },
    {
      option: "Recursion",
      value: "Recursion",
    },
    {
      option: "Memory Management",
      value: "Memory Management",
    },
    {
      option: "Garbage Collection",
      value: "Garbage Collection",
    },
    {
      option: "Advanced Data Types",
      value: "Advanced Data Types",
    },
    {
      option: "Type Systems",
      value: "Type Systems",
    },
    {
      option: "Object-Oriented Programming",
      value: "Object-Oriented Programming",
    },
    {
      option: "Language-specific Features",
      value: "Language-specific Features",
    },
  ],
  frontend: [
    {
      option: "User Interface Development",
      value: "User Interface Development",
    },
    {
      option: "Functional Programming",
      value: "Functional Programming",
    },
    {
      option: "Testing and Debugging",
      value: "Testing and Debugging",
    },
    {
      option: "Interoperability and API",
      value: "Interoperability and API",
    },
    {
      option: "Responsive Design",
      value: "Responsive Design",
    },
    {
      option: "Cross-Browser Compatibility",
      value: "Cross-Browser Compatibility",
    },
    {
      option: "Web Accessibility",
      value: "Web Accessibility",
    },
    {
      option: "State Management",
      value: "State Management",
    },
    {
      option: "Client-Side Routing",
      value: "Client-Side Routing",
    },
  ],
  backend: [
    {
      option: "Object-Oriented Programming",
      value: "Object-Oriented Programming",
    },
    {
      option: "Optimization and Efficiency",
      value: "Optimization and Efficiency",
    },
    {
      option: "Concurrency and Parallelism",
      value: "Concurrency and Parallelism",
    },
    {
      option: "Security and Best Practices",
      value: "Security and Best Practices",
    },
    {
      option: "Error Handling and Exceptions",
      value: "Error Handling and Exceptions",
    },
    {
      option: "Functions and Procedures",
      value: "Functions and Procedures",
    },
    {
      option: "Database Management",
      value: "Database Management",
    },
    {
      option: "API Design and Development",
      value: "API Design and Development",
    },
    {
      option: "Authentication and Authorization",
      value: "Authentication and Authorization",
    },
    {
      option: "Caching Strategies",
      value: "Caching Strategies",
    },
    {
      option: "Middleware and Integration",
      value: "Middleware and Integration",
    },
  ],
}

export const DefaultLanguage: IItemCategory = {
  option: "javascript",
  value: "JavaScript",
  language: "javascript",
  functionSyntax: `function myFunction() {\n\treturn false;\n}`,
  color: "#F7DF1E",
  logo: <SiJavascript />,
  version: "18.15.0",
}

export const DefaultCategory: IItemCategory = {
  option: "languages",
  language: "",
  value: "Lenguajes",
  functionSyntax: `null`,
  color: "#F7DF1E",
  logo: <Book />,
  version: "18.15.0",
}

export const StyleCodeEditor = {
  width: "max-content",
  padding: "0 2em 0 0",
  fontFamily: "monospace",
  fontSize: "0.9em",
}
