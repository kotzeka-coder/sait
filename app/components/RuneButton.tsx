"use client";
import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  href: string;
  alt?: string;
  ariaLabel?: string;
};

export default function RuneButton({ src, href, alt = "rune", ariaLabel }: Props) {
  return (
    <a
      href={href}
      aria-label={ariaLabel ?? alt}
      className={[
        "inline-flex flex-col items-center gap-3",
        "bg-transparent p-0 select-none",
        "transition",
        "hover:brightness-110",
        "hover:[filter:drop-shadow(0_0_12px_rgba(251,191,36,0.65))]",
        "focus-visible:outline-none",
        "focus-visible:[filter:drop-shadow(0_0_14px_rgba(251,191,36,0.8))]",
        "active:translate-y-[1px] active:scale-[0.98]",
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        width={256}
        height={256}
        className="pixel-art w-[128px] h-[128px] md:w-[160px] md:h-[160px] object-contain"
        style={{ imageRendering: "pixelated" }}
      />
      <span className="text-base md:text-lg -mt-8 font-sans text-amber-300">
        {ariaLabel ?? alt} 
      </span>
    </a>
  );
}
