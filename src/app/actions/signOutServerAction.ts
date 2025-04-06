"use server"

import { createSupabaseServerClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";

export default async function signOut() {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log("Error logging out user");
        console.log(error);
    } else {
        revalidatePath("/", "layout");
    }
}