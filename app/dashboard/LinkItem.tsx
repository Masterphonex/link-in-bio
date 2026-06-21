"use client"

import { deleteLink } from "./actions"
import EditLinkModal from "./EditLinkModal"

type LinkItemProps = {
  id: string
  title: string
  url: string
}

export default function LinkItem({ id, title, url }: LinkItemProps) {
  async function handleDelete() {
    const confirmed = confirm("Delete this link?")
    if (!confirmed) return
    await deleteLink(id)
  }

  return (
    <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg px-4 py-3">
      <a href={url} target="_blank" className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-gray-400 text-sm">{url}</p>
      </a>
      <button
        onClick={handleDelete}
        className="text-red-400 hover:text-red-300 text-sm font-medium ml-4"
      >
        Delete
      </button>
      <EditLinkModal id={id} title={title} url={url} />
    </div>
  )
}
