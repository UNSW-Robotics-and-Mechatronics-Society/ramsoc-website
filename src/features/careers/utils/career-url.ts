/**
 * Normalize the call to action URL from a career entry.
 * @param ctaUrl - Call to action URL from career entry
 * @returns Normalized call to action URL or null if invalid
 */
export const normalizeCareerCtaUrlStrict = (
  ctaUrl: string | null | undefined,
): string | null => {
  if (!ctaUrl || ctaUrl.trim() === "") {
    return null;
  }

  const trimmedUrl = ctaUrl.trim();

  try {
    // If it already has protocol, validate it
    if (/^https?:\/\//i.test(trimmedUrl)) {
      new URL(trimmedUrl); // Throws if invalid
      return trimmedUrl;
    }

    // Add https:// and validate
    const normalizedUrl = trimmedUrl.startsWith("www.")
      ? `https://${trimmedUrl}`
      : `https://${trimmedUrl}`;

    new URL(normalizedUrl); // Throws if invalid
    return normalizedUrl;
  } catch {
    // Invalid URL
    return null;
  }
};
