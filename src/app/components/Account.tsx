import { createSupabaseServerClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import SignOutButton from "./SignOutButton";


export default async function Account() {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser()
    
    if (error || !data?.user) {
        return (
            <div className="flex no-wrap gap-x-4 items-center">
                <Link href={"/dashboard"} className="hover:text-[#52796f]">Dashboard</Link>
                <Link href={"/study-guide"} className="hover:text-[#52796f]">Study Guides</Link>
                    {/* {JSON.stringify(data)} */}
                <div className="flex no-wrap gap-x-4 pl-4 items-center border-l-1 border-gray-200">
                    <Link href={"/auth/login"} className="bg-[#cad2c5] hover:bg-[#84a98c] cursor-pointer rounded-sm px-4 py-2">Log in</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex no-wrap gap-x-4 items-center">
                <Link href={"/dashboard"} className="hover:text-[#52796f]">Dashboard</Link>
                <Link href={"/study-guide"} className="hover:text-[#52796f]">Study Guides</Link>
                <div className="flex no-wrap gap-x-4 pl-4 items-center border-l-1 border-gray-200">
                    <span>{data.user.email}</span>
                    <SignOutButton />
                </div>
            </div>
        )
    }
}
