"use server"

import { createSupabaseServerClient } from "@/utils/supabase/server"

export default async function generateDocument(
    inputMaterial: string,
    numQuestions: number,
    generateAnswers: boolean,
    generateGuide: boolean
) {
    const supabase = await createSupabaseServerClient();
    const { authData, authError } = supabase.auth.getUser();

    if (authError) {
        return {
            error: "Not authenticated"
        }
    }

    // const { data, error } = supabase.insert()
}