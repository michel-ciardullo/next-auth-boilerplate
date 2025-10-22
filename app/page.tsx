'use server'

import Link from 'next/link'

import Navbar from '@/components/navbar'
import Header from '@/components/header'
import Main from '@/components/main'

export default async function Home() {
  return (
    <div className="min-h-full">
      <Navbar />
      <Header>Home</Header>

      <Main>
        <section className="max-w-4xl mx-auto text-center py-16 px-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Welcome to Your Next.js App
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            This is a modern web application built with Next.js, NextAuth, and TailwindCSS.  
            Log in to access your personalized dashboard and manage your data securely.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/auth/login"
              className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 dark:hover:bg-indigo-400 transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="rounded-md border border-indigo-600 dark:border-indigo-400 px-5 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition"
            >
              Register
            </Link>
          </div>
        </section>
      </Main>
    </div>
  )
}
