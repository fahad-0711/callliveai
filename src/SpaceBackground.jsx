import { useEffect, useRef, memo } from 'react';

const SpaceBackground = memo(function SpaceBackground() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const shootingStarTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate stars
    const stars = [];
    const rng = (min, max) => Math.random() * (max - min) + min;

    // 180 tiny stars
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: rng(0.4, 0.9),
        baseOpacity: rng(0.3, 0.8),
        color: '#ffffff',
        twinkleSpeed: rng(0.0008, 0.003),
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // 60 small stars
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: rng(1.0, 1.6),
        baseOpacity: rng(0.5, 0.9),
        color: '#e8eeff',
        twinkleSpeed: rng(0.0006, 0.002),
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // 30 medium stars
    const medColors = ['#ffffff', '#ccd6ff', '#ffeedd'];
    for (let i = 0; i < 30; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: rng(1.8, 2.8),
        baseOpacity: rng(0.6, 1.0),
        color: medColors[Math.floor(Math.random() * medColors.length)],
        twinkleSpeed: rng(0.0005, 0.0015),
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // 10 bright stars with lens flare
    for (let i = 0; i < 10; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: rng(3, 4),
        baseOpacity: rng(0.8, 1.0),
        color: '#ffffff',
        twinkleSpeed: rng(0.0004, 0.001),
        twinkleOffset: Math.random() * Math.PI * 2,
        bright: true,
      });
    }

    // Dust particles
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: rng(0.5, 1.5),
        color: Math.random() > 0.5
          ? `rgba(150,100,255,${rng(0.2, 0.4)})`
          : `rgba(0,200,255,${rng(0.15, 0.3)})`,
        vx: rng(-0.3, 0.3),
        vy: rng(-0.3, 0.3),
      });
    }

    // Shooting stars
    const shootingStars = [];
    let shootingStarCount = 0;

    const spawnShootingStar = () => {
      if (shootingStarCount < 2) {
        shootingStarCount++;
        const s = {
          x: rng(0, canvas.width),
          y: rng(-20, canvas.height * 0.3),
          length: 120,
          speed: rng(8, 14),
          opacity: 1,
          life: 0,
          maxLife: 60,
          angle: rng(0.6, 1.0),
        };
        shootingStars.push(s);
      }
      shootingStarTimeoutRef.current = setTimeout(spawnShootingStar, rng(4000, 8000));
    };
    shootingStarTimeoutRef.current = setTimeout(spawnShootingStar, 2000);

    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars with twinkling
      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset);
        const opacity = star.baseOpacity * (0.6 + 0.4 * twinkle);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0, opacity);
        ctx.fill();

        // Lens flare for bright stars
        if (star.bright) {
          ctx.globalAlpha = opacity * 0.4;
          // Horizontal line
          ctx.beginPath();
          ctx.moveTo(star.x - star.r * 4, star.y);
          ctx.lineTo(star.x + star.r * 4, star.y);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.5;
          ctx.stroke();
          // Vertical line
          ctx.beginPath();
          ctx.moveTo(star.x, star.y - star.r * 4);
          ctx.lineTo(star.x, star.y + star.r * 4);
          ctx.stroke();
        }
      }

      // Draw dust particles
      ctx.globalAlpha = 1;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity = 1 - s.life / s.maxLife;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 1;
        ctx.stroke();

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
          shootingStarCount--;
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (shootingStarTimeoutRef.current) clearTimeout(shootingStarTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Layer 1 — Base gradient */}
      <div className="space-base-gradient" />

      {/* Layer 2 — Nebula orbs */}
      <div className="nebula-orb nebula-orb-a" />
      <div className="nebula-orb nebula-orb-b" />
      <div className="nebula-orb nebula-orb-c" />

      {/* Layer 3-6 — Stars, twinkling, shooting stars, dust particles */}
      <canvas ref={canvasRef} className="star-canvas" />
    </>
  );
});

export default SpaceBackground;
