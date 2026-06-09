import Link from 'next/link';
import { CanvasParticles } from '@/components/ui/canvas-particles';
import { Navbar } from '@/components/ui/nav';
import { Footer } from '@/components/ui/footer';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-[#f5f5f7] font-sans flex flex-col">
      <CanvasParticles />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 text-center px-6 space-y-6">
        <p className="text-8xl font-black text-white/5">404</p>
        <div className="-mt-8 space-y-3">
          <h1 className="text-3xl font-bold text-white">Page Not Found</h1>
          <p className="text-muted-foreground text-sm max-w-sm">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link href="/"
          className="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          Return Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
