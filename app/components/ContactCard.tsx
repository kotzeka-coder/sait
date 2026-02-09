"use client";

const TG = "https://t.me/evg_space_engineer";

export default function ContactCard() {
  return (
    <div className="pixel-border bg-black/30 rounded-md p-4 md:p-5">
      <a
        href={TG}
        target="_blank"
        rel="noreferrer"
        className={[
          "w-full inline-flex items-center justify-center",
          "rounded-md px-4 py-4 md:py-5",
          "bg-amber-500 text-black font-semibold",
          "transition active:translate-y-[1px] active:scale-[0.99]",
          "hover:brightness-110 hover:shadow-lg hover:shadow-black/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60",
        ].join(" ")}
      >
        Написать в Telegram
      </a>

      <div className="mt-3 text-sm text-zinc-300">
        Ник: <span className="text-amber-300 font-semibold">@evg_space_engineer</span>
      </div>

      <div className="mt-1 text-xs text-zinc-400">
        Обычно отвечаю быстро. Если задача срочная — так и пиши.
      </div>
    </div>
  );
}
