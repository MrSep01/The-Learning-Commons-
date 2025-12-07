import { GoogleGenAI } from "@google/genai";
import { Tutor, ShowcaseProject } from '../types';

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

const SYSTEM_INSTRUCTION = `
You are the "Virtual Librarian" for The Learning Commons, a modern, dynamic school hub.
Your goal is to assist students, teachers, and parents.
The Learning Commons is not just a library; it is a space for innovation, collaboration, and community.
It features an Innovation Center (Makerspace), Portfolio Support Center, Subject-Specialist Zones, and areas for PD.
You should be helpful, encouraging, and knowledgeable about educational resources, research skills, and technology.
If asked about the Learning Commons itself, describe it as a flexible, inclusive environment that bridges physical and virtual learning.
Keep answers concise and suitable for a school environment.
`;

export const sendMessageToVirtualLibrarian = async (message: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, I cannot connect to the Virtual Commons right now. Please check the API configuration.";
  }

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I'm having trouble retrieving that information right now.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm currently offline. Please try again later.";
  }
};

export const getTutorRecommendation = async (studentQuery: string, tutors: Tutor[]): Promise<{ recommendedTutorId: string; reasoning: string } | null> => {
  if (!ai) return null;

  const tutorsContext = tutors.map(t => ({
    id: t.id,
    name: t.name,
    role: t.role,
    subjects: t.subjects,
    bio: t.bio
  }));

  const prompt = `
    A student is asking for help: "${studentQuery}"
    
    Here is the list of available tutors:
    ${JSON.stringify(tutorsContext)}

    Task: Identify the single best tutor match for this student's specific problem.
    - If the student asks about a specific subject (e.g. "Math"), finding a tutor with that subject is priority.
    - If the student asks about a specific topic (e.g. "Derivatives"), check the bios for expertise.
    - Consider the tutor's role (Peer vs Teacher) if implied in the tone, but expertise comes first.
    
    Return a JSON object with:
    - "recommendedTutorId": The exact ID of the tutor.
    - "reasoning": A brief, encouraging explanation (1 sentence) of why this tutor is the best fit.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Error matching tutor:", error);
    return null;
  }
};

export const explainProjectTech = async (project: ShowcaseProject): Promise<string> => {
  if (!ai) return "AI explanation unavailable.";

  const prompt = `
    Analyze this student project:
    Title: ${project.title}
    Description: ${project.description}
    Tools Used: ${project.toolsUsed.join(', ')}

    Task: Explain "How it works" in simple, educational terms for a middle-school student. 
    Focus on how the specific tools (like ${project.toolsUsed[0]}) were likely used to achieve the result.
    Keep it short (2-3 sentences) and inspiring.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate explanation.";
  } catch (error) {
    console.error("Error explaining project:", error);
    return "Could not generate explanation.";
  }
};
