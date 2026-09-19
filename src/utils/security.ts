/**
 * Enterprise-grade security utilities
 * Sanitization, validation, anti-XSS, and submission rate-limiting
 */

/**
 * Escapes HTML characters to prevent XSS injection attacks.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validates email addresses using strict regex pattern.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

/**
 * Checks if a URL is safe to open (blocks javascript:, data:, and insecure protocols)
 */
export function isSafeUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Simple in-memory client-side rate limiter for the contact form
 */
class RateLimiter {
  private lastSubmissionTime = 0;
  private minIntervalMs = 5000; // 5 seconds cooldown between submissions

  canSubmit(): boolean {
    const now = Date.now();
    if (now - this.lastSubmissionTime < this.minIntervalMs) {
      return false;
    }
    return true;
  }

  recordSubmission(): void {
    this.lastSubmissionTime = Date.now();
  }

  getRemainingCooldownSeconds(): number {
    const elapsed = Date.now() - this.lastSubmissionTime;
    const remaining = Math.max(0, this.minIntervalMs - elapsed);
    return Math.ceil(remaining / 1000);
  }
}

export const submissionRateLimiter = new RateLimiter();
