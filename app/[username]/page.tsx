import { prisma } from "@/lib/prisma"
import LinkCard from "./LinkCard"

import { notFound } from "next/navigation"

type Link = {
  id: string
  title: string
  url: string
}

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: {
      username
    },
    include: {
      links: true
    }
  })

  if (!user) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
          {user.username[0].toUpperCase()}
        </div>
        <h1>{user.username}</h1>
        {user.links.map((link: Link) => <LinkCard key={link.id} title={link.title} url={link.url} />)}

      </div>
    </main>
  )
}
