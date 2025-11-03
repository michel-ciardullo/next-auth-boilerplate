'use server'

import { deleteSession } from "@/app/session/lib/session"
import { redirect } from "next/navigation"

export default async function logoutAction() {
  await deleteSession()
  redirect('/auth/login')
}
