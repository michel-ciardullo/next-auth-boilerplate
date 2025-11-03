"use client";

import { useActionState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import AppLogo from "@/app/components/app-logo";
import verifyAction from "../actions/verify-action";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [state, formAction, isPending] = useActionState(verifyAction, {
    data: { token }
  });

  const handleRedirect = () => {
    setTimeout(() => router.push("/auth/login"), 2000);
  };

  if (state?.success) {
    handleRedirect();
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <AppLogo className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Email Verification
        </h2>

        {state?.error && (
          <p className="mt-4 text-red-600 dark:text-red-400">{state.error}</p>
        )}
        {state?.success && (
          <p className="mt-4 text-green-600 dark:text-green-400">
            Email verified! Redirecting to login...
          </p>
        )}
      </div>

      <form action={formAction} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <input type="hidden" name="token" value={token} />
        {!state?.success && (
          <button
            type="submit"
            disabled={isPending}
            className={`flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm 
              hover:bg-indigo-500 dark:hover:bg-indigo-400 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500
              ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Verifying..." : "Verify Email"}
          </button>
        )}
      </form>
    </div>
  );
}
