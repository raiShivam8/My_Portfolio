/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          hover: '#1D4ED8',
          light: '#EFF6FF',
          dark: '#1E40AF',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E5E7EB',
          dark: '#0F172A',
          cardDark: '#1E293B',
          borderDark: '#334155',
        },
        content: {
          main: '#111827',
          secondary: '#4B5563',
          muted: '#6B7280',
          light: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '14px',
        'container': '16px',
        'btn': '8px',
      },
      maxWidth: {
        'site': '1200px',
      }
    },
  },
  plugins: [],
}
