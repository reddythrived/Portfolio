'use client';

import React, { useState, useRef } from 'react';
import { submitContactMessage } from '@/app/actions/portfolio';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactMessage(null, formData);
    
    setLoading(false);
    if (result.success) {
      setResponse({ success: true, message: result.message });
      if (formRef.current) formRef.current.reset();
    } else {
      setResponse({ success: false, error: result.error });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden z-10 px-6 max-w-7xl mx-auto">
      {/* Glow highlight */}
      <div className="absolute left-1/3 bottom-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Get in Touch</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Connect with Me
        </h3>
        <p className="text-muted-foreground text-sm md:text-base">
          Have an opportunity or want to collaborate on an AI or web engineering project? Send a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Contact Info Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white tracking-tight">Contact Information</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I am open to internships, full-time positions, and hackathon teams. Feel free to reach out via the form or other communication channels.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email me</p>
                  <a href="mailto:admin@thrivedreddy.com" className="text-sm font-medium text-white hover:text-primary transition-colors">
                    admin@thrivedreddy.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Call or WhatsApp</p>
                  <a href="tel:+910000000000" className="text-sm font-medium text-white hover:text-primary transition-colors">
                    +91 (Placeholder)
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <span className="text-sm font-medium text-white">
                    India
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 text-xs text-muted-foreground">
            Response rate: typically under 24 hours.
          </div>
        </div>

        {/* Form Panel */}
        <div className="lg:col-span-7">
          <SpotlightCard className="border-white/[0.04] p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="Inquiry or opportunity details"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Write details of the opportunity..."
                />
              </div>

              {/* Status Response Messages */}
              {response && (
                <div
                  className={`p-4 rounded-xl border flex items-center space-x-3 text-sm ${
                    response.success
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                  }`}
                >
                  {response.success && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
                  <span>{response.message || response.error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-center text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/95 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Secure Message</span>
                  </>
                )}
              </button>
            </form>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
