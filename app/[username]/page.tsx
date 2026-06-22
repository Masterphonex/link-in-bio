import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProfileView from "./ProfileView"

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: { username },
    include: { links: true },
  })

  if (!user) {
    notFound()
  }

  return <ProfileView username={user.username} links={user.links} />
}
