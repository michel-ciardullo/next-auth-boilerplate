// Utility functions for securely hashing and verifying passwords
// using the bcryptjs library. These functions should only be called
// on the server to protect sensitive operations.

import bcrypt from "bcryptjs";

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param password - The plain text password to hash.
 * @returns The securely hashed password.
 *
 * This function:
 * - Uses bcrypt with a salt round factor of 10.
 * - Produces a one-way hash that cannot be reversed.
 * - Should be used before storing passwords in the database.
 */
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

/**
 * Verifies whether a given plain text password matches a hashed password.
 *
 * @param password - The plain text password provided by the user.
 * @param hash - The previously hashed password stored in the database.
 * @returns `true` if the passwords match, otherwise `false`.
 *
 * This function:
 * - Uses bcrypt’s secure comparison algorithm.
 * - Prevents timing attacks through constant-time comparison.
 */
export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
