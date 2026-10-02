/**
 * Centralized API configuration and client helpers for the portfolio.
 *
 * IMPORTANT — Environment Variables Required:
 *   Vercel  → Set VITE_API_URL = your Render backend URL
 *             e.g. https://portfolio-contact-api.onrender.com
 *   Local   → Create frontend/.env.local with VITE_API_URL=http://localhost:1268
 *             (or leave unset — localhost:1268 is the automatic dev fallback)
 */

// Priority: VITE_API_URL env var → localhost in dev → hardcoded Render fallback
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:1268'
    : 'https://portfolio-backend-render.onrender.com');

export const CONTACT_ENDPOINT = `${API_BASE_URL.replace(/\/+$/, '')}/contact`;

/**
 * Sends contact message payload to the backend Express service.
 *
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.subject
 * @param {string} data.message
 * @param {string} [data.phone]
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function sendContactMessage(data) {
  try {
    // 30-second timeout to handle Render free-tier cold starts (backend may sleep after inactivity)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    let response;
    try {
      response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name?.trim(),
          email: data.email?.trim(),
          subject: data.subject?.trim(),
          message: data.message?.trim(),
          ...(data.phone ? { phone: String(data.phone).trim() } : {}),
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    let result;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      const errorMessage =
        result?.message ||
        (response.status === 400
          ? 'Please review your entries and try again.'
          : 'Unable to send your message right now. Please try again later.');

      return {
        success: false,
        message: errorMessage,
      };
    }

    return {
      success: true,
      message: result?.message || 'Your message has been sent successfully.',
    };
  } catch (error) {
    // AbortError means our 30s timeout fired (Render cold start took too long)
    if (error?.name === 'AbortError') {
      return {
        success: false,
        message:
          'The server is waking up (it sleeps when idle). Please wait 30 seconds and try again.',
      };
    }
    return {
      success: false,
      message:
        'Unable to reach the server. Please check your connection or reach out directly via email.',
    };
  }
}
