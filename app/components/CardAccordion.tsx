"use client";
import React, { useState } from "react";

export default function CardAccordion({
  title,
  children,
  summary,
}: {
  title: string;
  summary?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full rounded-md bg-black/40 p-4 pixel-border">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between gap-3 text-left focus-ring"
        aria-expanded={open}
      >
        <div>
          <div className="font-semibold">{title}</div>
          {summary && <div className="text-sm text-zinc-300 mt-1">{summary}</div>}
        </div>
        <div className="text-xs text-zinc-500">{open ? "–" : "+"}</div>
      </button>
      {open && <div className="mt-3 text-sm text-zinc-200">{children}</div>}
    </div>
  );
}
