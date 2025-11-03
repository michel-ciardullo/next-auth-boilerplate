import Link from 'next/link'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'

import Footer from '@/app/components/footer'
import LandingNavbar from '@/app/components/landing-navbar'

export const metadata = {
  title: "Terms of Service | Next Auth",
  description: "Read the terms of service for using Next Auth.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-full">
      <LandingNavbar />

      <header className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-6" />
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
            Please review our Terms of Service to understand your rights and obligations when using
            Next Auth. Your trust and privacy are our top priorities.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500"
            >
              Back to Home
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              View Privacy Policy <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="bg-white dark:bg-gray-900 py-4 md:py-16">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheckIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Terms of Service
            </h1>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Welcome to Next Auth! By using our website and authentication services, 
            you agree to the following terms and conditions. Please read them carefully 
            before using our platform.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            By accessing or using Next Auth, you agree to comply with these Terms of Service. 
            If you do not agree, you must not access or use our platform.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            2. Use of the Service
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You agree to use the service only for lawful purposes and in accordance 
            with applicable laws and regulations. You may not use the service in a 
            manner that could damage, disable, or impair our systems or interfere 
            with other users’ enjoyment of the service.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            3. User Accounts
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            To access certain features, you must create an account. You are responsible 
            for maintaining the confidentiality of your login credentials and for all 
            activities that occur under your account. We reserve the right to suspend or 
            terminate accounts that violate these Terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            4. User-Generated Content
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You retain ownership of content you submit but grant us a non-exclusive, 
            royalty-free license to display and distribute it within our platform. 
            You must not post or share content that is illegal, harmful, or infringes 
            the rights of others.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            5. Privacy and Data Protection
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Your use of Next Auth is also governed by our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>. Please review it to understand how we collect, use, and protect 
            your personal information.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            The service is provided {'"'}as is{'"'} without warranties of any kind. We are not 
            responsible for damages or losses resulting from your use or inability to 
            use our services, except where prohibited by law.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            7. Account Termination
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We reserve the right to suspend or permanently delete accounts that violate 
            our Terms or engage in abusive or fraudulent activity.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            8. Changes to These Terms
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We may modify these Terms at any time. Updates will be posted on this page, 
            and continued use of the service implies acceptance of the revised Terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            9. Governing Law
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            These Terms shall be governed by and construed in accordance with the laws 
            of your country of residence, without regard to conflict of law principles.
          </p>

          <p className="text-gray-700 dark:text-gray-300 mt-10">
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@next-auth.com"
              className="text-blue-600 hover:underline"
            >
              support@next-auth.com
            </a>.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Last updated: October 2025
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
