import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText, Sun, Moon, ArrowUpRight } from 'lucide-react';
import Button from './ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial dark mode preference
    const isDark =
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-[#E5E7EB] dark:border-slate-800 shadow-sm'
          : 'bg-[#F8FAFC]/80 dark:bg-[#0F172A]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 h-[72px] flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-[#111827] dark:text-white"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm group-hover:bg-blue-700 transition-colors">
            SR
          </span>
          <span>
            Shivam Rai
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 ml-1"></span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-[#4B5563] dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-[8px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Button
            href="/Shivam_Rai_Resume.pdf"
            download="Shivam_Rai_Resume.pdf"
            variant="secondary"
            size="sm"
            icon={FileText}
            iconPosition="left"
          >
            Download Resume
          </Button>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-6 transition-all duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <Button
                href="/Shivam_Rai_Resume.pdf"
                download="Shivam_Rai_Resume.pdf"
                variant="primary"
                size="md"
                icon={FileText}
                iconPosition="left"
                className="w-full justify-center"
              >
                Download Resume
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
