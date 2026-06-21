import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import AddLinkModal from "./AddLinkModal"
import LinkItem from "./LinkItem"
import SignOut from "./signout"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto flex flex-col gap-8">
        <div className="flex gap-3 items-center justify-between">
          <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
          <SignOut />
        </div>
        <AddLinkModal />

        <div className="flex flex-col gap-3">
          {links.length === 0 && (
            <p className="text-gray-500 text-sm">No links yet. Add one above.</p>
          )}
          {links.map((link) => (
            <LinkItem
              key={link.id}
              id={link.id}
              title={link.title}
              url={link.url}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
