import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Clock, Sparkles, MessageSquare, AlertCircle, Copy, Check, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sanitizeInput, isValidEmail, submissionRateLimiter } from '../utils/security';

export const ContactFormView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'UI/UX & Design System',
    budget: '$3,000 - $5,000',
    subject: '',
    message: '',
    // Security honeypot field (hidden from legitimate users, auto-filled by spam bots)
    website_hp: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const serviceOptions = [
    'System Integration',
    'Full Stack Web App',
    'Automation & Workflow',
    'Data Analytics & AI',
    'Other Consulting'
  ];

  const budgetOptions = [
    '< $1,000',
    '$1,000 - $3,000',
    '$3,000 - $5,000',
    'Others'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanMessage = formData.message.trim();

    if (!cleanName) {
      errs.name = 'Please provide your name';
    } else if (cleanName.length > 80) {
      errs.name = 'Name must be 80 characters or fewer';
    }

    if (!cleanEmail) {
      errs.email = 'Please provide your email address';
    } else if (!isValidEmail(cleanEmail)) {
      errs.email = 'Please provide a valid, deliverable email address';
    }

    if (!cleanMessage) {
      errs.message = 'Please provide details about your project or inquiry';
    } else if (cleanMessage.length < 10) {
      errs.message = 'Please write at least 10 characters';
    } else if (cleanMessage.length > 3000) {
      errs.message = 'Message must be under 3,000 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRateLimitError(null);

    // Honeypot security check: silently reject bots
    if (formData.website_hp) {
      console.warn('Spam submission detected by honeypot filter');
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 800);

      return;
    }

    // Client-side validation
    if (!validate()) return;

    // Rate limiter check
    if (!submissionRateLimiter.canSubmit()) {
      const waitSeconds =
        submissionRateLimiter.getRemainingCooldownSeconds();

      setRateLimitError(
        `Security cooldown active. Please wait ${waitSeconds} second${
          waitSeconds > 1 ? 's' : ''
        } before submitting again.`
      );

      return;
    }

    setIsSubmitting(true);

    // Sanitize user inputs before sending them
    const sanitizedSubmission = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      service: sanitizeInput(formData.service),
      budget: sanitizeInput(formData.budget),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message),
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedSubmission),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message.');
      }

      // Only record the submission after the API succeeds
      submissionRateLimiter.recordSubmission();

      // Keep a local copy as a convenience/fallback
      try {
        const past = JSON.parse(
          localStorage.getItem('portfolio_contact_submissions') || '[]'
        );

        past.push(sanitizedSubmission);

        localStorage.setItem(
          'portfolio_contact_submissions',
          JSON.stringify(past.slice(-10))
        );
      } catch {
        // localStorage failure should not prevent successful email delivery
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

    } catch (error) {
      console.error('Contact form submission failed:', error);

      setIsSubmitting(false);

      setRateLimitError(
        'Sorry, your message could not be sent. Please try again or email me directly.'
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      service: 'UI/UX & Design System',
      budget: '$3,000 - $5,000',
      subject: '',
      message: '',
      website_hp: ''
    });
    setIsSubmitted(false);
    setRateLimitError(null);
    setErrors({});
  };

  return (
    <div id="contact-form-section" className="space-y-4">
      {/* Header */}
      <div className="pb-2 border-b border-blue-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-500" />
            Let&apos;s Build Something Extraordinary
          </h2>
          <p className="text-xs text-slate-500">
            Have a project in mind, an inquiry, or looking to collaborate? Fill in the details below.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-blue-700 border border-blue-200/80 shadow-xs transition-all w-fit cursor-pointer"
        >
          {copiedEmail ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-blue-500" />
              <span>Copy {PERSONAL_INFO.email}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Form Container */}
        <div className="lg:col-span-8">
          {isSubmitted ? (
            <div className="glass-subcard rounded-2xl p-6 sm:p-8 text-center space-y-4 border border-emerald-200/80 bg-emerald-50/40 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. I have received your request regarding <span className="font-semibold text-blue-600">{formData.service}</span> and will review it promptly.
                </p>
              </div>

              {/* Inquiry Summary Box */}
              <div className="text-left text-xs bg-white/80 p-4 rounded-xl border border-emerald-200/60 max-w-md mx-auto space-y-1.5 shadow-xs">
                <div className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Inquiry Summary
                </div>
                <div className="text-slate-700">
                  <span className="font-medium text-slate-500">Sender:</span> {formData.email}
                </div>
                <div className="text-slate-700">
                  <span className="font-medium text-slate-500">Selected Service:</span> {formData.service}
                </div>
                <div className="text-slate-700">
                  <span className="font-medium text-slate-500">Budget Range:</span> {formData.budget}
                </div>
                <div className="text-slate-700 italic border-t border-slate-100 pt-1.5 mt-1.5 line-clamp-3">
                  &ldquo;{formData.message}&rdquo;
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-subcard rounded-2xl p-4 sm:p-5 border border-white/90 shadow-sm space-y-4">
              {rateLimitError && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{rateLimitError}</span>
                </div>
              )}

              {/* Anti-spam Honeypot input: visually hidden, accessible by robots only */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_hp">Do not fill this</label>
                <input
                  id="website_hp"
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                />
              </div>

              {/* Name and Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    maxLength={80}
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/80 border transition-all outline-none focus:ring-2 focus:ring-blue-400/50 ${
                      errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    maxLength={100}
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/80 border transition-all outline-none focus:ring-2 focus:ring-blue-400/50 ${
                      errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Interest / Service
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {serviceOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setFormData({ ...formData, service: opt })}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border cursor-pointer ${
                        formData.service === opt
                          ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold shadow-xs'
                          : 'bg-white/70 border-slate-200/80 text-slate-600 hover:bg-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Estimated Budget
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`px-3 py-1.5 rounded-xl text-xs text-center transition-all border cursor-pointer ${
                        formData.budget === b
                          ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold shadow-xs'
                          : 'bg-white/70 border-slate-200/80 text-slate-600 hover:bg-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject (Optional) */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  maxLength={120}
                  placeholder="e.g. Redesign of SaaS Web Application"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/80 border border-slate-200 hover:border-slate-300 transition-all outline-none focus:ring-2 focus:ring-blue-400/50"
                />
              </div>

              {/* Message */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Project Details & Goals <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {formData.message.length}/3000 characters
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  maxLength={3000}
                  placeholder="Tell me about your project, timeline, deliverables, and expectations..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/80 border transition-all outline-none focus:ring-2 focus:ring-blue-400/50 resize-none ${
                    errors.message ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-contact-form-btn"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Securing & Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Proposal</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Info & FAQ */}
        <div className="lg:col-span-4 space-y-3">
          <div className="glass-subcard rounded-2xl p-4 border border-white/90 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-blue-100 pb-2">
              Contact Information
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Email</div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="font-semibold hover:text-blue-600 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Base Location</div>
                  <div className="font-medium">{PERSONAL_INFO.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Response Guarantee</div>
                  <div className="font-medium text-emerald-700">Under 24 hours (Mon-Sat)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-subcard rounded-2xl p-4 border border-white/90 shadow-sm space-y-2 bg-gradient-to-br from-white/90 to-blue-50/50">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              What to Expect Next:
            </h4>
            <ol className="text-[11px] text-slate-600 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Detailed review of your requirements</li>
              <li>A direct response with scope analysis</li>
              <li>Optional 20-min introductory video call</li>
              <li>Clear proposal with milestones & deliverables</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
