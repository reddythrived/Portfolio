'use client';

import React, { useEffect, useRef } from 'react';

interface CanvasParticlesProps {
  particleColor?: string;
  lineColor?: string;
  count?: number;
  speed?: number;
}

export const CanvasParticles: React.FC<CanvasParticlesProps> = ({
  particleColor = 'rgba(167, 139, 250, 0.25)', // light purple
  lineColor = 'rgba(167, 139, 250, 0.04)',
  count = 60,
  speed = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse movement trackers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on borders
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse attraction/repulsion interaction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRef.current.radius) {
            // Gently pull particles toward cursor
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            this.x += (dx / dist) * force * 0.8;
            this.y += (dy / dist) * force * 0.8;
          }
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = particleColor;
        context.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: count }, () => new Particle());

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw floating background gradients
      const radialGradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        10,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.6
      );
      radialGradient.addColorStop(0, 'rgba(15, 10, 30, 0.15)');
      radialGradient.addColorStop(0.5, 'rgba(5, 5, 12, 0.05)');
      radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Connect particles with thin lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5 * (1 - dist / 120);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [particleColor, lineColor, count, speed]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};
