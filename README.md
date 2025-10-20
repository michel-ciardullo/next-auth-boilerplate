# 🧱 Next Auth Boilerplate

This is a modern **Next.js + NextAuth.js** boilerplate designed to help you kickstart secure authentication in your Next.js projects — with built-in support for **dark mode**, **TailwindCSS**, and a clean modular architecture.

---

## 🚀 Features

* ⚡️ **Next.js 15+** with App Router
* 🔐 **NextAuth.js** authentication (Credentials provider setup)
* 🎨 **TailwindCSS** with light/dark theme
* 🤩 Modular UI Components (`Navbar`, `Header`, `Main`, `Input`, etc.)
* 🤯 Protected routes and session-based navigation
* 🤀 Ready-to-extend structure for dashboards, profiles, and reports

---

## 🛠️ Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/michel-ciardullo/next-auth-boilerplate.git
cd next-auth-boilerplate
npm install
```

Then, start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

---

## ⚙️ Environment Setup

Create a `.env.local` file in the project root and configure the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

> 💡 You can generate a secure secret with:
>
> ```bash
> openssl rand -base64 32
> ```

---

## 🗂️ Project Structure

```
next-auth-boilerplate/
├── app/
│   ├── api/
│   │   └── auth/
│   │   └── [...nextauth]/route.ts
│   ├── auth/
│   │   ├── error/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── ui
│   ├── navbar
│   ├── header
│   └── main
├── utils/
│   └── functions.ts
└── README.md
```

---

## 🔐 Authentication Flow

1. User signs in via `/auth/login` using email and password.
2. The credentials are validated through the **NextAuth Credentials Provider**.
3. On success, the user is redirected to `/dashboard`.
4. Session state is managed globally through `SessionProvider`.
5. Navbar automatically adapts — showing user info or login/register links depending on session.

---

## 💻 Development Notes

* Uses `useSession()` hook (NextAuth) with `<SessionProvider>`
* Fully compatible with server and client components
* Light/dark mode automatically adapts using Tailwind classes
* Example routes:

  * `/` → Home (public)
  * `/auth/login` → Sign In
  * `/auth/register` → Sign Up
  * `/dashboard` → Protected user area

---

## 📦 Deployment

You can deploy easily to [**Vercel**](https://vercel.com) (recommended):

1. Push your code to GitHub
2. Import the repo on [Vercel](https://vercel.com/new)
3. Add your environment variables (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`)
4. Deploy 🚀

Read more in the [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🧠 Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [NextAuth.js Documentation](https://next-auth.js.org/)
* [TailwindCSS Docs](https://tailwindcss.com/docs)

---

## 🧑‍💻 Author

Created with ❤️ by michel-ciardullo
Feel free to contribute, fork, or open issues to improve the boilerplate!
