'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Input from "@/components/ui/form/input";
import Label from "@/components/ui/form/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setErrors({});

    // Basic client-side validation
    const newErrors: typeof errors = {};
    if (!email.includes("@")) newErrors.email = "Invalid email address";
    if (!password || password.length < 6) newErrors.password = "Invalid password";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setPending(false);
      return;
    }

    // Call NextAuth credentials provider
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setPending(false);

    if (res?.error) {
      const newErrors: typeof errors = {};

      switch (res.error) {
        case "INVALID_EMAIL":
          newErrors.email = "No user found with this email";
          break;
        case "INVALID_PASSWORD":
          newErrors.password = "Incorrect password";
          break;
        case "MISSING_CREDENTIALS":
          newErrors.general = "Please enter your credentials";
          break;
        default:
          newErrors.general = "An unexpected error occurred. Please try again.";
      }

      setErrors(newErrors);
    } else {
      router.push("/dashboard"); // Redirect after successful sign in
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="text-red-600 dark:text-red-400 text-sm">{errors.general}</div>
          )}

          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <small className="text-red-600 dark:text-red-400 block mt-1">{errors.email}</small>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <div className="text-sm">
                {/* 🔑 Forgot Password Link */}
                <Link
                  href="/auth/forgot"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <small className="text-red-600 dark:text-red-400 block mt-1">{errors.password}</small>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className={`flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs 
              hover:bg-indigo-500 dark:hover:bg-indigo-400 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500
              ${pending ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* 📝 Sign Up Link */}
        <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
