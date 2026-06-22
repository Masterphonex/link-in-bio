"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { signIn } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function LoginPage() {
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

    const { error } = await signIn.email({
      email,
      password,
      fetchOptions: {
        onError: (ctx: { error: { message: string } }) => setError(ctx.error.message),
      },
    })

    if (!error) {
      router.push("/dashboard")
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm flex flex-col gap-6"
      >
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="font-display text-2xl font-bold">Welcome back</h1>
          <p className="text-muted text-sm">Log in to manage your links</p>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg py-2 px-3"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="bg-surface border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-muted"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="bg-surface border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-muted"
          />
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-accent text-white py-3 rounded-full font-semibold mt-1 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </motion.button>
        </form>

        <p className="text-center text-muted text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-foreground underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </motion.div>
    </main>
  )
}
