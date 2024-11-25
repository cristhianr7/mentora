"use server"

import { IAlgorithm } from "../interfaces/algorithm"
import { IOutputRunCode, IResponseOutputRunCode } from "../interfaces/languages"
import { IQuestion } from "../interfaces/quiz"
import { z } from "zod"
import { APICallError, RetryError, generateObject } from "ai"
import { google } from "@ai-sdk/google"

import { NextResponse } from "next/server"
interface IResponseFetchQuiz {
  error: boolean
  message: string
  data: IQuestion | null
}

interface IResponseFetchAlgorithm {
  error: boolean
  message: string
  data: IAlgorithm | null
}

const URL = process.env.URL_API

const algorithmSchema = z.object({
  title: z.string(),
  codeTemplate: z.string(),
  expectedOutput: z.string(),
  inputDescription: z.string(),
  outputDescription: z.string(),
  constraints: z.array(z.string()),
  exampleInputs: z.array(z.string()),
  exampleOutputs: z.array(z.string()),
  tags: z.array(z.string()),
  explanation: z.string(),
})

export const GetNewQuiz = async (
  category: string,
  language: string,
  level: string,
  apiKey: string,
): Promise<IResponseFetchQuiz> => {
  const type = (Math.random() * 15).toFixed(0)
  try {
    const response = await fetch(`${URL}/api/quiz`, {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify({
        category,
        language,
        level,
        type,
        apiKey,
      }),
    })
    const data = await response.json()

    if (response.ok) {
      const newResponse: IResponseFetchQuiz = {
        error: false,
        message: "Correcto",
        data: data.data,
      }
      return newResponse
    }
    if (response.status === 401) {
      const newResponse: IResponseFetchQuiz = {
        error: true,
        message:
          "Clave API inválida o no ingresada. Por favor, verifica e intenta nuevamente",
        data: null,
      }
      return newResponse
    } else if (response.status === 429) {
      const newResponse: IResponseFetchQuiz = {
        error: true,
        message:
          "Ha superado su cuota actual, compruebe los detalles de su plan y facturación",
        data: null,
      }
      return newResponse
    } else {
      const newResponse: IResponseFetchQuiz = {
        error: true,
        message: "Error en servidor, intentar mas tarde",
        data: null,
      }
      return newResponse
    }
  } catch (error) {
    console.error(error)
    const newResponse: IResponseFetchQuiz = {
      error: true,
      message: "Error en servidor, intentar mas tarde",
      data: null,
    }
    return newResponse
  }
}

export const GetNewAlgorithm = async (
  language: string,
  level: string,
  category: string,
): Promise<IResponseFetchAlgorithm> => {
  try {
    // Configuración de la generación de algoritmo
    const prompt = `
      Genera un ejercicio de solución de algoritmos de programación.
      - Estructurado en formato JSON.
      - Incluye solo los campos: title, codeTemplate, expectedOutput, inputDescription, outputDescription, constraints, exampleInputs, exampleOutputs, tags y explanation.
      - Evita caracteres especiales, saltos de línea y formatea el JSON completamente.

      **Configuración**
      - Nivel: ${level}
      - Lenguaje: ${language}
      - Categoría: ${category}

      **Requisitos:**
      - En español
      - Explicación detallada y completa del problema y del tema
      - Añadir una plantilla de código
      - En codeTemplate, solo poner lo necesario para comenzar en el lenguaje
      - Sin solución completa, solo la plantilla

      **Notas adicionales:**
      - Añadir ejemplos si aplica.
    `

    // Solicitud de generación de algoritmo
    const { object } = await generateObject({
      model: google("gemini-1.5-flash", {
        structuredOutputs: false,
      }),
      system:
        "You generate a programming algorithm to solve, depending on the level, category and programming language provided.",
      maxTokens: 800,
      maxRetries: 2,
      schema: algorithmSchema,
      prompt: prompt,
    })

    // Si la generación es exitosa, devolver los datos
    return {
      error: false,
      message: "Correcto",
      data: object,
    }
  } catch (error: any) {
    console.error("Error generando el algoritmo:", error)

    // Manejo de errores específicos para respuestas al frontend
    let errorMessage = "Error en servidor, intentar más tarde"

    if (error.statusCode === 401) {
      errorMessage = "Clave API inválida. Verifica e intenta nuevamente"
    } else if (error.statusCode === 429) {
      errorMessage =
        "Has superado tu cuota actual, revisa los detalles de tu plan y facturación"
    } else if (error.statusCode === 422) {
      errorMessage = "Error en el análisis de JSON: Respuesta JSON no válida"
    }

    return {
      error: true,
      message: errorMessage,
      data: null,
    }
  }
}

export const RunCode = async (
  language: string,
  sourceCode: string,
  version: string,
): Promise<IResponseOutputRunCode> => {
  const URL_API_PISTON = "https://emkc.org/api/v2/piston/execute"

  try {
    // Sanitiza el código fuente
    const cleanSourceCode = sourceCode
      .replaceAll("\\n", "")
      .replaceAll("\\t", "")
      .replaceAll("\\", "")
      .replaceAll("\n", "")

    // Configuración de la solicitud de ejecución de código
    const response = await fetch(URL_API_PISTON, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: language,
        version: version,
        files: [{ content: cleanSourceCode }],
      }),
    })

    // Procesa la respuesta según el código de estado
    if (response.ok) {
      const data = await response.json()
      return {
        error: false,
        response: data,
      }
    } else if (response.status === 400) {
      return {
        error: true,
        response: null,
      }
    } else {
      return {
        error: true,
        response: null,
      }
    }
  } catch (error) {
    console.error("Error al ejecutar el código:", error)
    return {
      error: true,
      response: null,
    }
  }
}
