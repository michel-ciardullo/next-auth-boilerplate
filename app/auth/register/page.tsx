'use client'

import { useActionState } from "react";
import Link from "next/link";

import registerUser from "@/actions/auth/register-user";
import Input from "@/components/ui/form/input";
import Label from "@/components/ui/form/label";

export default function Register() {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="mt-2">
              <Input id="name" name="name" type="text" defaultValue={state?.name} required />
              {state?.errors?.properties?.name?.errors.length && <small className="text-red-600 dark:text-red-400 block mt-1">{state?.errors?.properties.name.errors[0]}</small>}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-2">
              <Input id="email" name="email" type="email" defaultValue={state?.email} required autoComplete="email" />
              {state?.errors?.properties?.email?.errors.length && <small className="text-red-600 dark:text-red-400 block mt-1">{state?.errors?.properties.email.errors[0]}</small>}
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="mt-2">
              <Input id="password" name="password" type="password" required />
              {state?.errors?.properties?.password?.errors.length && <small className="text-red-600 dark:text-red-400 block mt-1">{state?.errors?.properties.password.errors[0]}</small>}
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="mt-2">
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
              {state?.errors?.properties?.confirmPassword?.errors.length && <small className="text-red-600 dark:text-red-400 block mt-1">{state?.errors?.properties.confirmPassword.errors[0]}</small>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs 
              hover:bg-indigo-500 dark:hover:bg-indigo-400 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500
              ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
