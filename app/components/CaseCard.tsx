"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import RuneIconButton from "./RuneIconButton";

export default function CaseCard({
  icon,
  title,
  result,
  details,
}: {
  icon: string;
  title: string;
  result: string;
  details: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  function toggle() {
    setOpen((s) => !s);
  }

  const contentId = `case-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex gap-3 items-start">
      <RuneIconButton
        src={icon}
        alt={title}
        onClick={toggle}
        ariaControls={contentId}
        ariaExpanded={open}
        btnMobile={96}
        btnDesktop={112}
        imgMobile={88}
        imgDesktop={104}
      />
      <div className="flex-1">
        <div className="p-3 rounded-md pixel-border bg-black/40">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-lg">{title}</div>
              <div className="text-sm text-zinc-300">{result}</div>
            </div>
            <div className="text-xs text-zinc-400">{open ? "Открыто" : "Свернуто"}</div>
          </div>
        </div>

        <div
          id={contentId}
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
