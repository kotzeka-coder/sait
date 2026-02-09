"use client";

import React from "react";

type Props = {
  src: string;
  alt: string;
  onClick?: () => void;
  href?: string;

  ariaControls?: string;
  ariaExpanded?: boolean;

  btnMobile?: number;
  btnDesktop?: number;
  imgMobile?: number;
  imgDesktop?: number;
};

export default function RuneIconButton({
  src,
  alt,
  onClick,
  href,
  ariaControls,
  ariaExpanded,
  btnMobile = 120,
  btnDesktop = 140,
  imgMobile = 112,
  imgDesktop = 132,
}: Props) {
  const Tag: any = href ? "a" : "button";
  const tagProps = href ? { href } : { type: "button", onClick };

  // CSS-переменные, чтобы Tailwind мог делать responsive размеры
  const vars = {
    ["--btn" as any]: `${btnMobile}px`,
    ["--btnMd" as any]: `${btnDesktop}px`,
    ["--img" as any]: `${imgMobile}px`,
    ["--imgMd" as any]: `${imgDesktop}px`,
  };

  return (
    <Tag
      {...tagProps}
      style={vars}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      className={[
        "shrink-0 grid place-items-center",
        "w-[var(--btn)] h-[var(--btn)] md:w-[var(--btnMd)] md:h-[var(--btnMd)]",
        "bg-transparent",
        "cursor-pointer",
        "hover:brightness-110 hover:[filter:drop-shadow(0_0_12px_rgba(251,191,36,0.65))]",
        "focus-visible:outline-none focus-visible:[filter:drop-shadow(0_0_14px_rgba(251,191,36,0.75))]",
        "transition select-none",
      ].join(" ")}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={[
          "w-[var(--img)] h-[var(--img)] md:w-[var(--imgMd)] md:h-[var(--imgMd)]",
          "object-contain",
          "[image-rendering:pixelated]",
        ].join(" ")}
      />
    </Tag>
  );
}
