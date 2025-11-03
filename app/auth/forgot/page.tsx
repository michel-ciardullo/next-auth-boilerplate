'use client'

import { useActionState } from "react";
import Link from "next/link";

import FormLabel from "@/app/components/form-label";
import FormInput from "@/app/components/form-input";
import FormErrors from "@/app/components/form-errors";

import AppLogo from "@/app/components/app-logo";
import forgetAction from "../actions/forgot-action";

export default function ForgotPassword() {
  const [state, formAction, isPending] = useActionState(forgetAction, null);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <AppLogo className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={formAction} className="space-y-6">
          <div>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              defaultValue={state?.data?.email}
              className="mt-2"
              required
            />
            <FormErrors errors={state?.errors?.properties?.email?.errors} />
          </div>

          {state?.success && state.message && (
            <div className="text-green-600 dark:text-green-400 text-sm">
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-xs 
              hover:bg-indigo-500 dark:hover:bg-indigo-400 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500
              ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Sending reset link..." : "Send reset link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Remembered your password?{" "}
          <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
