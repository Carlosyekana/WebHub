import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  label?: string;
}

const CITY_TAGS = [
  'Guadalajara',
  'Ñuñoa',
  'Medellín',
  'Quito',
  'Curitiba',
  'Montevideo',
  'Tapachula',
  'San Salvador',
  'Bogotá',
  'Córdoba',
  'Miraflores',
  'Renca',
];

export const ParticleNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: -1000, y: -1000 };

    const particles: Particle[] = [];
    const colors = ['#254EDB', '#FF4D29', '#10B981', '#0F1115'];

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.length = 0;
      const count = Math.min(34, Math.max(18, Math.floor(width / 42)));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: i < CITY_TAGS.length ? 3.5 : 2,
          color: colors[i % colors.length],
          label: i < CITY_TAGS.length ? CITY_TAGS[i] : undefined,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle mouse repulsion + spring feel
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 130 && distMouse > 1) {
          const force = (130 - distMouse) / 130;
          p.vx += (dxMouse / distMouse) * force * 0.14;
          p.vy += (dyMouse / distMouse) * force * 0.14;
        }

        // Damping & max speed clamp
        p.vx *= 0.985;
        p.vy *= 0.985;
        if (Math.abs(p.vx) < 0.08) p.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(p.vy) < 0.08) p.vy += (Math.random() - 0.5) * 0.05;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 12 || p.x > width - 12) p.vx *= -1;
        if (p.y < 12 || p.y > height - 12) p.vy *= -1;

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 155) {
            const alpha = (1 - dist / 155) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle =
              i % 3 === 0
                ? `rgba(37, 78, 219, ${alpha})`
                : `rgba(15, 17, 21, ${alpha * 0.8})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Mouse highlight link
        if (distMouse < 170) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 77, 41, ${(1 - distMouse / 170) * 0.35})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.label) {
          ctx.font = '500 10px "IBM Plex Mono", monospace';
          ctx.fillStyle = 'rgba(15, 17, 21, 0.55)';
          ctx.fillText(p.label, p.x + 7, p.y + 3);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    draw();
    window.addEventListener('resize', init);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
