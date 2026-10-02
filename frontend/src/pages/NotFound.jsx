import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-5 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-6xl sm:text-7xl font-mono font-bold text-blue-600 dark:text-blue-400">
          404
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight">
          Page Not Found
        </h1>

        <p className="text-base text-[#4B5563] dark:text-slate-400 leading-relaxed">
          The requested page could not be found. Please check the URL or return to the homepage.
        </p>

        <div className="pt-2 flex justify-center">
          <Button to="/" variant="primary" size="md" icon={Home} iconPosition="left">
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
