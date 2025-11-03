import Link from 'next/link'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'

import Footer from '@/app/components/footer'
import LandingNavbar from '@/app/components/landing-navbar'

export const metadata = {
  title: "Privacy Policy | Next Auth",
  description: "Read how Next Auth collects, uses, and protects your personal data.",
}

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
            Learn how Next Auth collects, uses, and protects your personal data.
            Transparency and security are at the core of everything we do.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500"
            >
              Back to Home
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              View Terms of Service <span aria-hidden="true">→</span>
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
              Privacy Policy
            </h1>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Your privacy is important to us. This Privacy Policy explains how Next Auth 
            collects, uses, and protects your personal information when you use our 
            authentication and user account services.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We may collect personal information such as your name, email address, 
            authentication tokens, and profile details. We also collect technical data 
            like IP addresses, browser type, and usage activity to improve our services.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We use your data to provide and improve our authentication services, 
            manage your account, communicate updates, enhance security, and 
            comply with legal obligations.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            3. Legal Basis for Processing
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We process your data based on your consent, the necessity of fulfilling 
            a contract (providing authentication), our legitimate interests, or legal obligations.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            4. Data Retention
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We retain your personal data only as long as necessary to provide our services 
            or as required by law. Once data is no longer needed, it will be securely deleted.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            5. Data Sharing
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We may share data with trusted third-party service providers (e.g., hosting, 
            email, or analytics services) under strict confidentiality agreements. 
            We do not sell personal data to third parties.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            6. Cookies and Tracking
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Our platform uses cookies to improve user experience, maintain sessions, 
            and analyze traffic. You can disable cookies through your browser settings.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            7. Your Rights
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You have the right to access, correct, delete, or restrict the processing 
            of your personal data. You may also request a copy of your data or withdraw 
            your consent at any time by contacting us.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            8. Data Security
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We implement appropriate technical and organizational measures to protect 
            your personal data against unauthorized access, disclosure, alteration, 
            or destruction.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            9. International Transfers
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            If your data is transferred outside your country, we ensure it is protected 
            through appropriate safeguards such as Standard Contractual Clauses or 
            equivalent legal mechanisms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            10. Changes to This Policy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We may update this Privacy Policy from time to time. The latest version 
            will always be posted on this page.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            11. Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@next-auth.com" className="text-blue-600 hover:underline">
              privacy@next-auth.com
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
