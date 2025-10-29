import 'server-only'

import { cookies, headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'

import { decrypt, encrypt } from '@/features/jwt'
import { createUserSession, deleteSessionById } from '@/features/session'

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const headersList = await headers();

  // 🧭 Récupère le vrai user-agent
  const rawUserAgent = headersList.get("user-agent") || "Unknown device";

  // 🌍 Tente de récupérer l'IP via plusieurs headers possibles
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "0.0.0.0";

  // 🧩 Parse et simplifie
  const parser      = new UAParser(rawUserAgent);
  const browserName = parser.getBrowser().name || "Unknown browser";
  const osName      = parser.getOS().name || "Unknown OS";
  const deviceType  = parser.getDevice().type || "desktop";

  const formattedUA = `${browserName} on ${osName}${deviceType !== "desktop" ? ` (${deviceType})` : ""}`;

  // Create a session in the database
  const { id: sessionId } = await createUserSession({
    userId,
    expiresAt,
    userAgent: formattedUA,
    ipAddress,
  });

  // Encrypt the session ID
  const sessionJWT = await encrypt({ userId, sessionId, expiresAt });

  // Store the session in cookies for optimistic auth checks
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
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value;
  if (token) {
    const payload = await decrypt(token);
    if (payload?.sessionId) {
      await deleteSessionById(payload.sessionId as string);
    }
  }
  cookieStore.delete('session');
}
