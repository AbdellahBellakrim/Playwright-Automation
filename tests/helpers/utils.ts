/**
 * Generates a random email address.
 * @param prefix - The prefix for the email (e.g., 'user').
 * @returns A random email address.
 */
export function generateRandomEmail(prefix: string = "user"): string {
  const randomNumber = Math.floor(Math.random() * 10000);
  return `${prefix}${randomNumber}@example.com`;
}

/**
 * Generates a random string of a given length.
 * @param length - The length of the random string.
 * @returns A random string.
 */
export function generateRandomString(length: number = 8): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Formats a date of birth into day, month, and year.
 * @param date - The date of birth as a Date object.
 * @returns An object containing day, month, and year.
 */
export function formatDateOfBirth(date: Date): {
  day: string;
  month: string;
  year: string;
} {
  const day = date.getDate().toString();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear().toString();
  return { day, month, year };
}
