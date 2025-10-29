'use server'

import { redirect } from "next/navigation"
import { deleteSession } from "@/features/session"

export default async function signOut() {
  await deleteSession()
  redirect('/auth/login')
}
