import 'server-only'

import { cookies, headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'
import { createUserSession, deleteSessionById } from '../data/session-data';
import { decrypt, encrypt } from '@/app/lib/jwt';

export async function createSession(userId: string, role: string, rememberMe?: boolean) {
  // 🕒 Set expiration based on "Remember me" option
  // If checked → 30 days, otherwise → 1 day
  const days = rememberMe ? 30 : 1;
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  const headersList = await headers();

  // 🧭 Get the real user-agent string
  const rawUserAgent = headersList.get("user-agent") || "Unknown device";

  // 🌍 Try to get the user's IP address from various headers
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "0.0.0.0";

  // 🧩 Parse and simplify user agent info
  const parser      = new UAParser(rawUserAgent);
  const browserName = parser.getBrowser().name || "Unknown browser";
  const osName      = parser.getOS().name || "Unknown OS";
  const deviceType  = parser.getDevice().type || "desktop";

  const formattedUA = `${browserName} on ${osName}${deviceType !== "desktop" ? ` (${deviceType})` : ""}`;

  // 💾 Create a new session record in the database
  const { id: sessionId } = await createUserSession({
    userId,
    expiresAt,
    userAgent: formattedUA,
    ipAddress,
  });

  // 🔐 Encrypt session data into a JWT
  const sessionJWT = await encrypt({
    id: sessionId,
    expiresAt,
    user: {
      id: userId,
      role
    }
  });

  // 🍪 Store the session token in a secure HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set('session', sessionJWT, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  // 🧹 If a session token exists, decrypt it and delete the DB session
  if (token) {
    const session = await decrypt(token);
    if (session?.id) {
      await deleteSessionById(session.id as string);
    }
  }

  // 🚮 Finally, remove the session cookie
  cookieStore.delete('session');
}
