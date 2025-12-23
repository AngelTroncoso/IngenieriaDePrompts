
import { GoogleGenAI, Type } from "@google/genai";
import { StyleTone, AppSettings } from "../types";

export const generatePromptAction = async (
  concept: string, 
  style: StyleTone,
  settings: AppSettings
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    Eres un Experto Arquitecto de Prompts (Prompt Architect). 
    Tu misión es transformar el concepto simple del usuario en un prompt de alta calidad para modelos de IA (como GPT-4 o Gemini).
    
    Reglas:
    1. Usa una estructura clara: Rol, Tarea, Contexto, Restricciones y Formato de Salida.
    2. Ajusta el tono según: ${style}.
    3. Nivel de creatividad (temperatura): ${settings.temperature / 100}.
    4. Longitud deseada: ${settings.responseLength}.
    ${settings.explainReasoning ? '5. Incluye una breve explicación del razonamiento detrás del prompt al final.' : ''}
    
    Concepto del usuario: "${concept}"
    
    Genera el prompt perfecto en español.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Genera el prompt ahora.",
      config: {
        systemInstruction,
        temperature: settings.temperature / 100,
      }
    });

    return response.text || "No se pudo generar el prompt. Intenta de nuevo.";
  } catch (error) {
    console.error("Error generating prompt:", error);
    return "Error al conectar con el servidor de IA.";
  }
};
