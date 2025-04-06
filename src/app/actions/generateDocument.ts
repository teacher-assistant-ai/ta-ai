"use server"

import { createSupabaseServerClient } from "@/utils/supabase/server"
import { GoogleGenAI, Type } from "@google/genai";
import { redirect } from "next/navigation";

export default async function generateDocument(
    inputMaterial: string,
    document_title: string,
    numQuestions: number,
    generateAnswers: boolean,
    generateGuide: boolean
) {
    const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const supabase = await createSupabaseServerClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
        console.log("authError", authError);
        return {
            error: "Not authenticated"
        }
    } else {
        console.log("Auth data");
        console.log(authData.user);
    }

    const { data: documentData, error: documentError } = await supabase.from("document")
        .insert({ owner_id: authData.user.id, title: document_title})
        .select()
        .limit(1)
        .single();

    if (documentError) {
        console.log("documentError", documentError);
        return {
            error: "Error creating document"
        }
    } else {
        console.log("document data");
        console.log(documentData);
    }

    // Now prompt Gemini to create the document
    let prompt: string = `
The teacher has prompted the following:
"Create a quiz containing ${numQuestions} problems related to the input material provided."

We have a web app that converts a learning resource (textbooks, articles, video transcripts, etc...) converted into text and fed to you to output an editable document for teachers. The type of document that this teacher wants you to output is a LaTeX document. The question string containing LaTeX should be MathJax friendly and well-formed.

Prepare and return the following JSON structure:
[
    {
        "question": "string containing LaTeX",
        "answer": "string containing LaTeX",
        "how_to": "string containing LaTeX"
    }
]

Here is an example. Your output should start with an opening brace '{' and end with a closing brace '}':
[
    {
        "question": "\\item Solve the first-order linear differential equation:\n    \\[\n    \\frac{dy}{dx} + 2xy = x\n    \\]",
        "answer": "$y=\frac{e^{-x^2+c_1}}{2}+\frac{1}{2}$"
        "how_to": "To acquire this answer, we first..."
    }
],
    ` 
    if (!generateAnswers || !generateGuide) {
        prompt += "\nHowever,\n"
    }

    if (!generateAnswers) {
        prompt += `\nThe teacher does NOT want you to generate answers, so you can leave the "answer" key as null.\n`
    }

    if (!generateGuide) {
        prompt += `\nThe teacher does NOT want you to generate how_to, so you can leave the "how_to" key as null.\n`
    }

    prompt += `\n Here is the input material:\n${inputMaterial}`

    console.log(prompt);

    const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        'question': {
                            type: Type.STRING,
                            description: 'string containing LaTeX',
                            nullable: false,
                        },
                        'answer': {
                            type: Type.STRING,
                            description: 'string containing LaTeX',
                            nullable: generateAnswers,
                        },
                        'how_to': {
                            type: Type.STRING,
                            description: 'string containing LaTeX',
                            nullable: generateGuide,
                        },
                    },
                    required: ['question'],
                },
            },
        }
    });

    console.log(response);
    console.log(response.text)

    let data;
    try {
        data = JSON.parse(response.text as string);
    } catch (e) {
        console.log("Error:", e)
        return {
            "error": e
        }; // error in the above string (in this case, yes)!
    }

    console.log(data);

    console.log("I am now outputting all the thangs");
    // console.log(data.quiz);

    const toInsert = data.map((question) => { return {
        document_id: documentData.id,
        answer: question.answer,
        question: question.question,
        how_to: question.how_to
    }})

    const { data: questionData, error: questionError } = await supabase.from("document_questions")
        .insert(toInsert)
        .select();

    if (questionError) {
        console.log("questionError", questionError);
        return {
            error: "Error inserting questions"
        }
    } else {
        console.log("questionData");
        console.log(questionData);
    }

    // redirect(`/editor/doc/${documentData.id}`);
    // revalidatePath(`/editor/doc/${documentData.id}`, "layout");
    return {
        documentId: documentData.id
    }
}