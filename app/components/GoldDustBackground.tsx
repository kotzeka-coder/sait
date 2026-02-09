"use client";
import React, { useEffect, useRef } from "react";

export default function GoldDustBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ✅ На мобилке режем DPR (иначе iPhone с DPR=3 жрёт как не в себя)
    const getDpr = () => {
      const dpr = window.devicePixelRatio || 1;
      return Math.min(dpr, isMobile ? 1.5 : 2);
    };

    function resize() {
      const dpr = getDpr();
      canvas!.width = Math.floor(window.innerWidth * dpr);
      canvas!.height = Math.floor(window.innerHeight * dpr);
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    type Dust = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      tw: number; // twinkle
    };

    // ✅ ХОЧЕШЬ БОЛЬШЕ ИСКР? подними эти числа.
    const count = isMobile ? 70 : 160;

    const dusts: Dust[] = [];

    function rand(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    for (let i = 0; i < count; i++) {
      dusts.push({
        x: rand(0, window.innerWidth),
        y: rand(0, window.innerHeight),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.05, -0.55),
        size: rand(0.6, isMobile ? 1.8 : 2.4),
        alpha: rand(0.05, isMobile ? 0.18 : 0.24),
        tw: rand(0, Math.PI * 2),
      });
    }

    let running = true;

    function step() {
      if (!running) return;

      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const d of dusts) {
        d.x += d.vx;
        d.y += d.vy;

        // лёгкое мерцание, чтобы не было “пузырей из центра”
        d.tw += 0.02;
        const a = d.alpha * (0.75 + 0.25 * Math.sin(d.tw));

        if (d.y < -10) d.y = window.innerHeight + 10;
        if (d.x < -20) d.x = window.innerWidth + 20;
        if (d.x > window.innerWidth + 20) d.x = -20;

        ctx!.beginPath();
        const r = d.size * 8; // радиус свечения
        const g = ctx!.createRadialGradient(d.x, d.y, 0, d.x, d.y, r);
        g.addColorStop(0, `rgba(255,176,32,${a})`);
        g.addColorStop(0.55, `rgba(255,176,32,${a * 0.18})`);
        g.addColorStop(1, `rgba(11,11,11,0)`);

        ctx!.fillStyle = g;
        ctx!.arc(d.x, d.y, d.size * 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    // ✅ Пауза когда вкладка не видна (мобилке легче)
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running && rafRef.current == null) rafRef.current = requestAnimationFrame(step);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-90"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
