"use client"

import signOut from "@/app/actions/signOutServerAction"

export default function SignOutButton() {
    return (
        <button onClick={() => signOut()} className="bg-[#cad2c5] hover:bg-[#84a98c] cursor-pointer rounded-sm px-4 py-2">Sign out</button>
    )
}