"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { deleteLink, editLink } from "./actions"

type LinkItemProps = {
  id: string
  title: string
  url: string
}

export default function LinkItem({ id, title, url }: LinkItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleValue, setTitleValue] = useState(title)
  const [urlValue, setUrlValue] = useState(url)

  async function handleDelete() {
    const confirmed = confirm("Delete this link?")
    if (!confirmed) return
    await deleteLink(id)
  }

  async function handleEditSubmit(formData: FormData) {
    await editLink(id, formData)
    setIsEditing(false)
  }

  return (
    <div className="bg-surface border border-white/5 rounded-2xl px-5 py-4">
      <div className="flex items-center justify-between">
        <a href={url} target="_blank" className="flex-1 min-w-0">
          <p className="font-semibold truncate">{title}</p>
          <p className="text-muted text-sm truncate">{url}</p>
        </a>
        <div className="flex items-center gap-3 ml-4 shrink-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-muted hover:text-accent text-sm font-medium transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-muted hover:text-red-400 text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            action={handleEditSubmit}
            className="flex flex-col gap-2 mt-4 overflow-hidden"
          >
            <input
              name="title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              required
              className="bg-background border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
            />
            <input
              name="url"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              required
              className="bg-background border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="bg-accent text-white py-2 rounded-lg text-sm font-semibold mt-1"
            >
              Save
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
