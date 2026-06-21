"use client"

import { useState } from "react"
import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const username = formData.get("username") as string

    const { error } = await signUp.email({
      email,
      password,
      name: username,
      username,
      fetchOptions: {
        onError: (ctx: { error: { message: string } }) => setError(ctx.error.message),
      },
    } as any)

    if (!error) {
      router.push(`/${username}`)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-white transition"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-white transition"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-white transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </main>
  )
}
