"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { addLink } from "./actions"

export default function AddLinkModal() {
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(formData: FormData) {
    await addLink(formData)
    setIsOpen(false)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-accent text-white py-3 rounded-full font-semibold"
      >
        + Add Link
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-surface border border-white/10 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">Add Link</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              <form action={handleSubmit} className="flex flex-col gap-3">
                <input
                  name="title"
                  type="text"
                  placeholder="Link title"
                  required
                  className="bg-background border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-muted"
                />
                <input
                  name="url"
                  type="url"
                  placeholder="https://..."
                  required
                  className="bg-background border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-muted"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-accent text-white py-3 rounded-full font-semibold"
                >
                  Save Link
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
