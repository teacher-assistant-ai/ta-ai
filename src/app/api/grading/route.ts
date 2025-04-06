import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || '' });

export async function POST(req: NextRequest) {
  try {
    const { content, exam, answers, selectedMaterial, selectedTest } = await req.json();
  if (!content && !selectedMaterial || !selectedTest && !exam || !answers) {
      return NextResponse.json({ error: 'Content, exam, or answers not provided' }, { status: 400 });
    }

    const prompt = `Grade the following exam based on the provided content and answers. Include:

1. Detailed feedback for each question
2. A score for each question
3. Suggestions for improvement
4. Overall score
5. Overall feedback
6. If the material given is not enough to answer the questions, mention that
7. Don't use I or me in the answer
8. Must be organized and easy to read
9. The final grade should be displayed at the beginning
10. Add lines between the questions and the answers
11. Use markdown format
12. Score format should start with 'Score:' followed by the score

Content: ${content} ${selectedMaterial}

Exam: ${exam} ${selectedTest}

Answers: ${answers}

Material Reference: ${selectedMaterial ? `Material ID: ${selectedMaterial}` : 'No material selected'}

Test Reference: ${selectedTest ? `Test ID: ${selectedTest}` : 'No test selected'}`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const gradingResult = response.text;

    return NextResponse.json({ gradingResult });
  } catch (error) {
    console.error('Error grading exam:', error);
    return NextResponse.json(
      { error: 'Failed to grade the exam' },
      { status: 500 }
    );
  }
}