/**
 * Centralized API configuration and client helpers for the portfolio.
 * Reuses environment configuration with clean fallback to local backend or production Render service.
 */

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
    const response = await fetch(CONTACT_ENDPOINT, {
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
    });

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
    return {
      success: false,
      message:
        'Unable to reach the server. Please check your connection or reach out directly via email.',
    };
  }
}
