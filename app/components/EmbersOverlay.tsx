"use client";
import React, { useEffect, useRef } from "react";

export default function EmbersOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    if (window.innerWidth < 768) return; // desktop only

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.clientWidth * devicePixelRatio);
    let h = (canvas.height = canvas.clientHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    type Ember = { x: number; y: number; vx: number; vy: number; size: number; life: number; alpha: number };
    const count = 32;
    const embers: Ember[] = [];

    function rand(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function resetEmber(e: Ember) {
      e.x = rand(0, canvas.clientWidth);
      e.y = canvas.clientHeight + rand(0, 60);
      e.vx = rand(-0.15, 0.15);
      e.vy = rand(-0.35, -0.6);
      e.size = rand(1.2, 3.2);
      e.life = rand(80, 220);
      e.alpha = rand(0.5, 1);
    }

    for (let i = 0; i < count; i++) {
      const e: Ember = { x: 0, y: 0, vx: 0, vy: 0, size: 1, life: 0, alpha: 1 };
      resetEmber(e);
      e.y = rand(0, canvas.clientHeight);
      embers.push(e);
    }

    function resize() {
      if (!ctx) return;
      w = (canvas.width = canvas.clientWidth * devicePixelRatio);
      h = (canvas.height = canvas.clientHeight * devicePixelRatio);
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    window.addEventListener("resize", resize);

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (const e of embers) {
        e.x += e.vx;
        e.y += e.vy;
        e.life -= 1;
        const grd = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 8);
        grd.addColorStop(0, `rgba(255,176,32,${e.alpha})`);
        grd.addColorStop(0.6, `rgba(255,176,32,${e.alpha * 0.25})`);
        grd.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(e.x, e.y, e.size * 2, 0, Math.PI * 2);
        ctx.fill();

        if (e.life <= 0 || e.y < -20 || e.x < -40 || e.x > canvas.clientWidth + 40) {
          resetEmber(e);
        }
      }
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        mixBlendMode: "screen",
      }}
    />
  );
}
