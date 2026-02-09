"use client";
import React, { useEffect, useRef } from "react";

export default function ForgeSparksOverlay() {
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

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx!.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    type Spark = { x: number; y: number; vx: number; vy: number; size: number; alpha: number; life: number };
    const sparks: Spark[] = [];
    const count = 18; // between 12-25

    function rand(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function reset(s: Spark) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      s.x = rand(w * 0.2, w * 0.8);
      s.y = rand(h * 0.7, h * 0.95); // spawn near bottom
      s.vx = rand(-0.25, 0.25);
      s.vy = rand(-0.6, -1.5);
      s.size = rand(1, 3.5); // px
      s.alpha = rand(0.6, 1);
      s.life = Math.floor(rand(80, 220));
    }

    for (let i = 0; i < count; i++) {
      const s: Spark = { x: 0, y: 0, vx: 0, vy: 0, size: 1, alpha: 1, life: 0 };
      reset(s);
      // spread initial y
      s.y = rand(canvas.clientHeight * 0.6, canvas.clientHeight);
      sparks.push(s);
    }

    function drawDiamond(cx: number, cy: number, size: number, color: string, alpha: number) {
      ctx!.beginPath();
      const s = size;
      ctx!.moveTo(cx, cy - s);
      ctx!.lineTo(cx + s, cy);
      ctx!.lineTo(cx, cy + s);
      ctx!.lineTo(cx - s, cy);
      ctx!.closePath();
      ctx!.fillStyle = color;
      ctx!.globalAlpha = alpha;
      ctx!.fill();
      ctx!.globalAlpha = 1;
    }

    function step() {
      ctx!.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      for (const s of sparks) {
        // movement
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 1;

        // flicker: slight random alpha modulation
        const flick = 0.6 + Math.random() * 0.8;

        // color variants: amber/gold/orange
        const color = Math.random() > 0.6 ? "#ffb020" : Math.random() > 0.5 ? "#ff9600" : "#ffcf66";
        const alpha = s.alpha * flick * (s.life / 220);

        // draw small diamond (pixel-like)
        drawDiamond(s.x, s.y, s.size, color, Math.max(0, alpha));

        // reset when faded or moved out
        if (s.life <= 0 || s.y < -10 || s.x < -20 || s.x > w + 20) {
          reset(s);
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

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden />;
}
