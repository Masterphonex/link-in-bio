"use client"

import { motion } from "motion/react"
import LinkCard from "./LinkCard"

type LinkType = {
  id: string
  title: string
  url: string
}

type ProfileViewProps = {
  username: string
  links: LinkType[]
}

export default function ProfileView({ username, links }: ProfileViewProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-100 h-100 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-24 h-24"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-linear-to-tr from-accent via-purple-400 to-accent opacity-70"
          />
          <div className="absolute inset-0.75 rounded-full bg-background flex items-center justify-center text-2xl font-display font-bold">
            {username[0].toUpperCase()}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-display text-xl font-bold"
        >
          @{username}
        </motion.h1>

        <div className="w-full flex flex-col gap-3 mt-2">
          {links.length === 0 && (
            <p className="text-muted text-sm text-center">No links yet.</p>
          )}
          {links.map((link, i) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              <LinkCard title={link.title} url={link.url} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
