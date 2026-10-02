import React, { useState } from 'react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import { Mail, Github, Linkedin, FileText, Download, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { sendContactMessage } from '../config/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      errors.name = 'Please provide your name.';
    } else if (trimmedName.length > 100) {
      errors.name = 'Name cannot exceed 100 characters.';
    }

    if (!trimmedEmail) {
      errors.email = 'Please provide your email address.';
    } else if (trimmedEmail.length > 254) {
      errors.email = 'Email address cannot exceed 254 characters.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!trimmedSubject) {
      errors.subject = 'Please provide a subject.';
    } else if (trimmedSubject.length > 200) {
      errors.subject = 'Subject cannot exceed 200 characters.';
    }

    if (!trimmedMessage) {
      errors.message = 'Please provide a message.';
    } else if (trimmedMessage.length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    } else if (trimmedMessage.length > 5000) {
      errors.message = 'Message cannot exceed 5000 characters.';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status.submitting) return;

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const response = await sendContactMessage(formData);

      if (response.success) {
        setStatus({ submitting: false, submitted: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setValidationErrors({});
      } else {
        setStatus({
          submitting: false,
          submitted: false,
          error: response.message || 'Unable to send your message. Please try again.',
        });
      }
    } catch {
      setStatus({
        submitting: false,
        submitted: false,
        error: 'Unable to send your message. Please try again.',
      });
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white/50 dark:bg-slate-900/30 border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Get In Touch"
          title="LET'S CONNECT"
          subtitle="I'm currently open to Junior Full Stack Developer and PHP/Laravel opportunities, as well as suitable freelance projects."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base sm:text-lg text-[#4B5563] dark:text-slate-300 leading-relaxed">
              If you'd like to discuss a job opportunity, project, or collaboration, feel free to reach out. I look forward to connecting.
            </p>

            <div className="space-y-4 pt-2">
              {/* Email */}
              <a
                href="mailto:raishivamrai837@gmail.com"
                className="flex items-center gap-3.5 p-4 rounded-[14px] bg-white dark:bg-slate-800/90 border border-[#E5E7EB] dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                    Direct Email
                  </div>
                  <div className="text-sm sm:text-base font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    raishivamrai837@gmail.com
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/raiShivam8/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-[14px] bg-white dark:bg-slate-800/90 border border-[#E5E7EB] dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                    GitHub Profile
                  </div>
                  <div className="text-sm sm:text-base font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    github.com/raiShivam8
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/shivam-rai-201753362/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-[14px] bg-white dark:bg-slate-800/90 border border-[#E5E7EB] dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                    LinkedIn Network
                  </div>
                  <div className="text-sm sm:text-base font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    shivam-rai-201753362
                  </div>
                </div>
              </a>

              {/* Resume */}
              <div className="p-4 rounded-[14px] bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Curriculum Vitae / Resume
                  </span>
                </div>
                <Button
                  href="/Shivam_Rai_Resume.pdf"
                  download="Shivam_Rai_Resume.pdf"
                  variant="primary"
                  size="sm"
                  icon={Download}
                  iconPosition="left"
                >
                  Download Resume
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-800/90 rounded-[14px] border border-[#E5E7EB] dark:border-slate-700/80 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#111827] dark:text-white tracking-tight mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-[#6B7280] dark:text-slate-400 mb-6">
                Fill out the form below and I will get back to you promptly.
              </p>

              {status.submitted ? (
                <div className="p-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-800 dark:text-emerald-200">
                    Message sent successfully!
                  </h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                  <Button
                    onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                    variant="secondary"
                    size="sm"
                    className="mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {status.error && (
                    <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 flex items-center gap-2 text-sm text-rose-700 dark:text-rose-300">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{status.error}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                    >
                      Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full px-4 py-2.5 rounded-[8px] border text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 ${
                        validationErrors.name
                          ? 'border-rose-500 dark:border-rose-500'
                          : 'border-[#E5E7EB] dark:border-slate-700 focus:border-blue-600'
                      }`}
                    />
                    {validationErrors.name && (
                      <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                    >
                      Email <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className={`w-full px-4 py-2.5 rounded-[8px] border text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 ${
                        validationErrors.email
                          ? 'border-rose-500 dark:border-rose-500'
                          : 'border-[#E5E7EB] dark:border-slate-700 focus:border-blue-600'
                      }`}
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                    >
                      Subject <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Role inquiry / Project discussion"
                      className={`w-full px-4 py-2.5 rounded-[8px] border text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 ${
                        validationErrors.subject
                          ? 'border-rose-500 dark:border-rose-500'
                          : 'border-[#E5E7EB] dark:border-slate-700 focus:border-blue-600'
                      }`}
                    />
                    {validationErrors.subject && (
                      <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                        {validationErrors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                    >
                      Message <span className="text-blue-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className={`w-full px-4 py-2.5 rounded-[8px] border text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 resize-y ${
                        validationErrors.message
                          ? 'border-rose-500 dark:border-rose-500'
                          : 'border-[#E5E7EB] dark:border-slate-700 focus:border-blue-600'
                      }`}
                    />
                    {validationErrors.message && (
                      <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                        {validationErrors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={status.submitting}
                    icon={
                      status.submitting
                        ? (props) => <Loader2 {...props} className={`${props.className || 'w-4 h-4'} animate-spin`} />
                        : Send
                    }
                    iconPosition="right"
                    className="w-full sm:w-auto mt-2"
                  >
                    {status.submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
