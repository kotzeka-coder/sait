"use client";
import React, { useEffect, useRef, useState } from "react";
import RuneIconButton from "./RuneIconButton";

export default function ServiceCard({
  icon,
  title,
  summary,
  details,
}: {
  icon: string;
  title: string;
  summary: string;
  details: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight);
  }, [open]);

  const id = `service-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
      <div className="flex gap-3 items-start" >
      <RuneIconButton
        src={icon}
        alt={title}
        onClick={() => setOpen((s) => !s)}
        ariaControls={id}
        ariaExpanded={open}
        btnMobile={104}
        btnDesktop={120}
        imgMobile={96}
        imgDesktop={112}
      />
      <div className="flex-1">
        <div className="p-3 rounded-md pixel-border bg-black/40">
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-zinc-300">{summary}</div>
        </div>

        <div
          id={id}
          role="region"
          aria-hidden={!open}
          ref={contentRef}
          className="overflow-hidden"
          style={{
            maxHeight: open ? (reduceMotion ? undefined : `${contentHeight}px`) : "0px",
            transition: reduceMotion ? "none" : "max-height 320ms ease, opacity 220ms ease",
            opacity: open ? 1 : 0,
          }}
        >
          <div className="p-3 text-sm text-zinc-200">{details}</div>
        </div>
      </div>
    </div>
  );
}
