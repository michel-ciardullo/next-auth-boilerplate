import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { getUser } from "@/features/auth/dal/auth-dal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Auth – User Profile",
  description: "Manage your account, update profile information, and change your password securely.",
  keywords: ["NextAuth", "Profile", "Account", "Authentication", "Next.js"],
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser()

  return (
    <html lang="en" className="h-full bg-gray-100 dark:bg-gray-900 dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <Providers user={user}>{children}</Providers>
      </body>
    </html>
  );
}
