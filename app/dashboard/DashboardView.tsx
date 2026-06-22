"use client"

import { motion } from "motion/react"
import AddLinkModal from "./AddLinkModal"
import LinkItem from "./LinkItem"
import SignOut from "./signout"

type LinkType = {
  id: string
  title: string
  url: string
}

type DashboardViewProps = {
  name: string
  username: string
  links: LinkType[]
}

export default function DashboardView({ name, username, links }: DashboardViewProps) {
  return (
    <main className="min-h-screen px-6 py-10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-md mx-auto flex flex-col gap-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold">Hey, {name} 👋</h1>

            <a href={`/${username}`}
              target="_blank"
              className="text-muted text-sm underline underline-offset-4 hover:text-accent transition-colors"
            >
              View your page →
            </a>
          </div>
          <SignOut />
        </div>

        <AddLinkModal />

        <div className="flex flex-col gap-3">
          {links.length === 0 && (
            <p className="text-muted text-sm text-center py-8">
              No links yet. Add your first one above.
            </p>
          )}
          {links.map((link, i) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <LinkItem id={link.id} title={link.title} url={link.url} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main >
  )
}
