"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
};

/* Starfield: ligero, se pausa cuando no se ve */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;
    const cv: HTMLCanvasElement = canvas;

    let stars: Star[] = [];
    let raf: number | null = null;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
      build();
    }

    function build() {
      const count = Math.min(
        140,
        Math.floor((window.innerWidth * window.innerHeight) / 14000)
      );
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * cv.width,
          y: Math.random() * cv.height,
          r: (Math.random() * 1.1 + 0.3) * dpr,
          a: Math.random() * 0.5 + 0.15,
          tw: Math.random() * 0.02 + 0.004,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      t += 1;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const alpha = s.a + Math.sin(t * s.tw) * 0.12;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.7, alpha));
        ctx.fillStyle = "#aab3bf";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y -= 0.03 * dpr;
        if (s.y < -2) s.y = cv.height + 2;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function onVisibilityChange() {
      if (document.hidden && raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      } else if (!document.hidden && raf === null) {
        raf = requestAnimationFrame(draw);
      }
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", onResize);
    resize();
    draw();

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas id="starfield" aria-hidden="true" ref={canvasRef} />;
}
