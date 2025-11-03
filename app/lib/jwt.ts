// This file is marked as "server-only" to ensure it is never imported on the client side.
// It guarantees that secret keys and JWT signing logic run only on the server.
import 'server-only'

import { JWTPayload, SignJWT, jwtVerify } from 'jose'

// Retrieve the secret key from environment variables.
// Must be defined in your `.env.local` as NEXTAUTH_SECRET.
const secretKey  = process.env.NEXTAUTH_SECRET

// Encode the secret key to a Uint8Array for use with the "jose" library.
const encodedKey = new TextEncoder().encode(secretKey)

/**
 * Encrypts (signs) a payload into a JSON Web Token (JWT).
 *
 * @param payload - The data to include in the token (e.g. user ID, email, etc.)
 * @returns A signed JWT string.
 *
 * This function:
 * - Uses the HS256 algorithm.
 * - Sets the issue time automatically.
 * - Sets the token to expire in 7 days.
 */
export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // Define the signing algorithm.
    .setIssuedAt()                        // Add "issued at" timestamp.
    .setExpirationTime('7d')              // Token expires in 7 days.
    .sign(encodedKey)                     // Sign using the encoded secret key.
}

/**
 * Decrypts (verifies) a JWT and returns its payload.
 *
 * @param token - The JWT string to verify.
 * @returns The decoded payload if the token is valid, otherwise `null`.
 *
 * This function:
 * - Verifies the token signature using the HS256 algorithm.
 * - Returns the token payload if valid.
 * - Returns `null` if the token is invalid or expired.
 */
export async function decrypt(token: string | undefined = '') {
  if (!token)
    return null
  
  try {
    // Checks the validity of the token and decodes its content.
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    // In case of failure (e.g., expired token, corrupted token, incorrect key), log an error.
    console.error('Failed to verify session token:', error)
  }

  // Returns null if the token is invalid.
  return null
}
