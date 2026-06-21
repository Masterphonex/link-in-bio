"use client"

import { signOut } from "@/lib/auth-client"
import { redirect } from "next/navigation"

function handleSignOut() {
  signOut()
  redirect("/login")
}

export default function SignOut() {
  return (
    <button onClick={handleSignOut} className="cursor-pointer">
      Log out
    </button>
  )
}
