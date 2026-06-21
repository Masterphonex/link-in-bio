import React from 'react'

type LinkCardProps = {
  title: string
  url: string
}

export default function LinkCard({ title, url }: LinkCardProps) {
  return (
    <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg px-4 py-3">
      <a href={url} target="_blank" className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-gray-400 text-sm">{url}</p>
      </a>
    </div>
  )
}
