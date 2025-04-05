import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the model
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY || "" });

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const prompt = `Create a comprehensive study guide from the following text. Include:

1. If input is too short to generate a study guide, return "Not enough information to generate a study guide"
2. Key concepts and definitions
3. Important points to remember
4. Examples where applicable
5. Questions for self-assessment


Text: ${text}`;
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const studyGuide = response.text;

    return NextResponse.json({ studyGuide });
  } catch (error) {
    console.error("Error generating study guide:", error);
    return NextResponse.json(
      { error: "Failed to generate study guide" },
      { status: 500 }
    );
  }
}
