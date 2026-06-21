"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export async function addLink(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const url = formData.get("url") as string

  await prisma.link.create({
    data: {
      title,
      url,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard")
}



//Delete links
export async function deleteLink(linkId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  await prisma.link.delete({
    where: {
      id: linkId,
      userId: session.user.id, // ensures users can only delete their own links
    },
  })

  revalidatePath("/dashboard")
}


//Edit Links
export async function editLink(linkId: string, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const url = formData.get("url") as string

  await prisma.link.update({
    where: {
      id: linkId,
      userId: session.user.id,
    },
    data: {
      title,
      url,
    },
  })

  revalidatePath("/dashboard")
}
