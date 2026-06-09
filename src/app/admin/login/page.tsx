'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { CanvasParticles } from '@/components/ui/canvas-particles';
import { Loader2, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin/dashboard');
    }
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid admin credentials. Please try again.');
      } else {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#f5f5f7] font-sans flex flex-col justify-center items-center px-6">
      <CanvasParticles />

      <div className="w-full max-w-md relative z-10">
        <SpotlightCard className="p-8 border-white/5 bg-[#0a0a0c]/85">
          <div className="text-center space-y-2 mb-8">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Gatekeeper</h1>
            <p className="text-xs text-muted-foreground">Authenticate to access database CRUD and recruiter logs</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thrivedreddy.com"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            {error && (
              <div className="p-3 text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-center text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/95 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-primary/15"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authorizing...</span>
                </>
              ) : (
                <span>Access Console</span>
              )}
            </button>
          </form>
        </SpotlightCard>
      </div>
    </div>
  );
}
