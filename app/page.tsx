"use client"

import { motion } from "motion/react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center gap-6 max-w-md"
      >
        <span className="text-xs font-medium text-muted tracking-widest uppercase">
          Built by Builvo
        </span>

        <h1 className="font-display text-5xl font-bold leading-tight">
          One link.
          <br />
          Every part of you.
        </h1>

        <p className="text-muted text-base">
          Create your personal link page in seconds. Share everything that
          matters, in one place.
        </p>

        <motion.a
          href="/signup"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-accent text-white px-8 py-3.5 rounded-full font-semibold mt-2"
        >
          Get your page
        </motion.a>

        <Link href="/peace" className="text-muted text-sm underline underline-offset-4 hover:text-foreground transition-colors">
          See an example
        </Link>
      </motion.div>
    </main>
  )
}
