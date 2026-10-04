/**
 * Centralized API configuration and client helpers for the portfolio.
 *
 * Backend: https://my-portfolio-svqe.onrender.com (Render)
 * Frontend: https://myportfolio-rust-three-36.vercel.app (Vercel)
 *
 * Local dev: create frontend/.env.local → VITE_API_URL=http://localhost:1268
 */

const PRODUCTION_API = 'https://my-portfolio-svqe.onrender.com';

// Sanitize API URL: ignore empty values or the deprecated 'portfolio-backend-render' URL
const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim();
const isDeprecated = rawApiUrl.includes('portfolio-backend-render');

// If a valid custom VITE_API_URL is explicitly provided (and not deprecated), use it.
// Otherwise, default to the live, working Render production backend.
const apiUrl = rawApiUrl && !isDeprecated ? rawApiUrl : PRODUCTION_API;

export const API_BASE_URL = apiUrl.replace(/\/+$/, '');
export const CONTACT_ENDPOINT = `${API_BASE_URL}/contact`;

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
        result?.error ||
        result?.errorDetails ||
        (response.status === 400
          ? 'Please review your entries and try again.'
          : response.status === 404
          ? 'Backend endpoint not found. Please check API URL configuration.'
          : response.status === 502 || response.status === 503
          ? 'The server is temporarily busy or waking up. Please try again in 30 seconds.'
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
