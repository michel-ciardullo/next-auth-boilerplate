'use client'

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import resetPassword from "@/actions/reset-password";
import Input from "@/components/ui/form/input";
import Label from "@/components/ui/form/label";

export default function ResetPasswordPage() {
  const [state, formAction, isPending] = useActionState(resetPassword, null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Si aucun token n’est présent dans l’URL
    if (!token) {
      alert("Invalid or missing token");
    }
  }, [token]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {!state?.success ? (
          <form action={formAction} className="space-y-6">
            <input type="hidden" name="token" value={token || ""} />

            <div>
              <Label htmlFor="password">New password</Label>
              <div className="mt-2">
                <Input id="password" name="password" type="password" required />
                {state?.errors?.properties?.password?.errors?.length > 0 && (
                  <small className="text-red-600 dark:text-red-400 block mt-1">
                    {state.errors.properties.password.errors[0]}
                  </small>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="mt-2">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
                {state?.errors?.properties?.confirmPassword?.errors?.length > 0 && (
                  <small className="text-red-600 dark:text-red-400 block mt-1">
                    {state.errors.properties.confirmPassword.errors[0]}
                  </small>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm 
                hover:bg-indigo-500 dark:hover:bg-indigo-400 
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500
                ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {isPending ? "Reseting..." : "Reset password"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 dark:text-green-400 font-medium">
              ✅ Your password has been reset successfully.
            </p>
            <Link
              href="/auth/login"
              className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Go to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
