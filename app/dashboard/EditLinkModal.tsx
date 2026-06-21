"use client"

import { useState } from "react"
import { editLink } from "./actions"

type EditLinkModalProps = {
  id: string
  title: string
  url: string
}

export default function EditLinkModal({ id, title, url }: EditLinkModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [titleValue, setTitleValue] = useState(title)
  const [urlValue, setUrlValue] = useState(url)

  async function handleSubmit(formData: FormData) {
    await editLink(id, formData)
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-orange-400 hover:text-orange-300 transition ml-3"
      >
        Edit Link
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 transition-all ease-in-out">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Edit Link</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form action={handleSubmit} className="flex flex-col gap-3">
              <input
                name="title"
                type="text"
                placeholder="Link title"
                value={titleValue}
                required
                onChange={(e) => setTitleValue(e.target.value)}
                className="bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-white transition"
              />
              <input
                name="url"
                type="url"
                placeholder="https://..."
                value={urlValue}
                required
                onChange={(e) => setUrlValue(e.target.value)}
                className="bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-white transition"
              />
              <button
                type="submit"
                className="bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition"
              >
                Edit Link
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
