"use client"

import { useState } from "react"
import { addLink } from "./actions"

export default function AddLinkModal() {
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(formData: FormData) {
    await addLink(formData)
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition"
      >
        + Add Link
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 transition-all ease-in-out">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Add Link</h2>
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
                required
                className="bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-white transition"
              />
              <input
                name="url"
                type="url"
                placeholder="https://..."
                required
                className="bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-white transition"
              />
              <button
                type="submit"
                className="bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition"
              >
                Save Link
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
