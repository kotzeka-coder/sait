"use client";
import React from "react";

export default function PricingCard({
  title,
  price,
  bullets,
}: {
  title: string;
  price?: string;
  bullets: string[];
}) {
  return (
    <div className="p-4 rounded-md pixel-border bg-black/40 flex flex-col justify-between">
      <div>
        <div className="font-bold text-lg">{title}</div>
        {price && <div className="text-sm text-zinc-300 mt-1">{price}</div>}
        <ul className="mt-3 space-y-1 text-sm">
          {bullets.map((b, i) => (
            <li key={i}>• {b}</li>
          ))}
        </ul>
      </div>
      <a href="#contact" className="mt-4 inline-block w-full text-center rounded-md py-2 bg-amber-500 text-white hover:amber-glow focus-ring">
        Запросить
      </a>
    </div>
  );
}
