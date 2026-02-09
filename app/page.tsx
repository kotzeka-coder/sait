import Image from "next/image";
import ForgeSparksOverlay from "./components/ForgeSparksOverlay";
import RuneButton from "./components/RuneButton";
import ServiceCard from "./components/ServiceCard";
import CaseCard from "./components/CaseCard";
import PricingCard from "./components/PricingCard";
import ContactCard from "./components/ContactCard";

export default function Home() {
const services = [
  {
    icon: "/icons/service/landing.png",
    title: "Кузня лендингов",
    summary: "Соберу страницу, которая приносит заявки",
    details:
      "Оффер + структура • Верстка (Tilda/WP/Next) • Формы и TG • Мини-оптимизация и порядок",
  },
  {
    icon: "/icons/service/fix.png",
    title: "Патчи и ремонт",
    summary: "Починю баги, верстку и «всё поехало»",
    details:
      "Адаптив • Правки блоков/шрифтов/отступов • Формы/виджеты/аналитика • Срочные правки",
  },
  {
    icon: "/icons/service/speed.png",
    title: "Ускорение артефактов",
    summary: "Чтобы грузилось быстро и не бесило людей",
    details:
      "Оптимизация картинок/шрифтов/скриптов • Убираю лишнее • Проверка скорости • Мобилка без лагов",
  },
  {
    icon: "/icons/service/ai.png",
    title: "Магия контента",
    summary: "Тексты, таблицы, ИИ и видео-правки",
    details:
      "Тексты и структура • Таблицы Sheet/Excel • ИИ-задачи • Видео: правки/нарезки/субтитры",
  },
];

  const skills = [
    { icon: "/icons/skill/speed.png", label: "Speed" },
    { icon: "/icons/skill/responsive.png", label: "Responsive" },
    { icon: "/icons/skill/performance.png", label: "Performance" },
    { icon: "/icons/skill/seo.png", label: "SEO" },
    { icon: "/icons/skill/integrations.png", label: "Integrations" },
  ];

  const cases = [
  {
    icon: "/icons/case/landing.png",
    title: "Лендинг под заявку",
    result: "Собран «под ключ»",
    details: "Структура, тексты, блоки, адаптив. Главное — чтобы человек нажал и оставил заявку.",
  },
  {
    icon: "/icons/case/shop.png",
    title: "Ускорение сайта",
    result: "Загрузка быстрее",
    details: "Сжал картинки, почистил лишнее, подкрутил кеш/шрифты. Чтобы не было «долго грузится — я ушёл».",
  },
  {
    icon: "/icons/case/speed.png",
    title: "Правки и доработки",
    result: "Без боли",
    details: "Верстка, мелкие функции, поправить блоки, привести в порядок. Быстро и без 20 созвонов.",
  },
  {
    icon: "/icons/case/fix.png",
    title: "Контент и таблицы",
    result: "Чётко и читабельно",
    details: "Тексты, таблицы Excel/Sheets, оформление, структура. Плюс ИИ-помощь там, где реально ускоряет.",
  },
];


  const pricing = [
  {
    title: "Быстрая правка",
    price: "От 1 000 ₽",
    bullets: [
      "1–3 мелкие задачи (верстка/текст/таблица/видео)",
      "Срок: сегодня–завтра",
      "Без созвонов: дал доступ/ТЗ — сделал",
      "Подходит: «поправить и отпустить»",
    ],
  },
  {
    title: "Нормальный пакет",
    price: "От 3 000 ₽",
    bullets: [
      "Лендинг или блоки на сайте + адаптив",
      "Тексты/структура/таблицы (Sheets/Excel)",
      "ИИ-помощь (если ускоряет, а не портит)",
      "Срок: 3–7 дней",
    ],
  },
  {
    title: "Под ключ",
    price: "По договору",
    bullets: [
      "Комплекс: сайт + контент + правки + интеграции",
      "Скорость/оптимизация, формы, аналитика",
      "Видео: нарезки/субтитры/упаковка",
      "Сопровождение и итерации",
    ],
  },
];


  return (
    <div className="min-h-screen">
      {/* HUD bar */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-sm px-4 py-2 border-b border-amber-200/25">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="text-sm font-mono pixel">HUD • Портфолио — ретро-режим</div>
          <nav className="hidden md:flex gap-4 text-sm" aria-label="Main">
            <a href="#start" className="px-2 py-1">Start</a>
            <a href="#services" className="px-2 py-1">Services</a>
            <a href="#cases" className="px-2 py-1">Cases</a>
            <a href="#pricing" className="px-2 py-1">Pricing</a>
            <a href="#contact" className="px-2 py-1">Contact</a>
          </nav>
          <div className="ml-auto text-sm font-mono">Coins earned: <span className="font-bold">111111</span></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {/* Hero */}
        <section id="start" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="retro-soft-title text-4xl md:text-6xl leading-[0.98] text-[#f5f0e6]">Принимаю ваш квест и кую результат</h1>
            <p className="mt-10 text-zinc-300">Лендинги и доработки • Тексты и структура • Таблицы/Sheets • ИИ-помощь • Видео-правки</p>

            <div className="mt-6 flex items-center gap-3">
              <RuneButton src="/icons/rune/tg2.png" href="#contact" alt="Телега" ariaLabel="Телега" />
              <RuneButton src="/icons/rune/cases.png" href="#cases" alt="Кейсы" ariaLabel="Кейсы" />
              <RuneButton src="/icons/rune/price.png" href="#pricing" alt="Цены" ariaLabel="Цены" />
            </div>
          </div>

          <div className="relative w-full h-64 md:h-96 rounded-md pixel-border overflow-hidden">
            <Image src="/hero/services.png" alt="Forge" fill style={{ objectFit: "cover" }} priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
            <ForgeSparksOverlay />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative">
  <div className="grid grid-cols-1 sm:grid-cols-[360px,1fr] lg:grid-cols-[420px,1fr] gap-8 items-start">
    {/* ЛЕВАЯ КАРТИНКА */}
    <div className="relative overflow-hidden rounded-xl">
    </div>

    {/* ПРАВАЯ ЧАСТЬ */}
    <div className="min-w-0">
      <h2 className="text-xl font-semibold mb-4">Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((s) => (
          <ServiceCard
            key={s.title}
            icon={s.icon}
            title={s.title}
            summary={s.summary}
            details={s.details}
          />
        ))}
      </div>
    </div>
  </div>
</section>


        {/* Scene break after Skills */}
<section aria-hidden className="mt-10">
  <div className="relative w-full h-64 md:h-96 rounded-md pixel-border overflow-hidden">
    <Image
      src="/hero/skills.png"
      alt=""
      fill
      sizes="(max-width: 768px) 100vw, 1100px"
      className="object-cover pixel-art"
      priority={false}
    />
    {/* чуть затемняем, чтобы не било по глазам */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/40" />
  </div>
</section>


        {/* Cases */}
        <section id="cases">
          <h2 className="pixel text-xl font-semibold mb-4">Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cases.map((c) => (
              <CaseCard key={c.title} icon={c.icon} title={c.title} result={c.result} details={c.details} />
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing">
          <h2 className="pixel text-xl font-semibold mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricing.map((p) => (
              <PricingCard key={p.title} title={p.title} price={p.price} bullets={p.bullets} />
            ))}
          </div>
        </section>
        {/* Scene break AFTER Cases */}
<section aria-hidden className="mt-10">
  <div className="relative w-full h-64 md:h-[420px] overflow-hidden rounded-lg">
    <Image
      src="/hero/forge.png"
      alt=""
      fill
      priority={false}
      className="object-cover pixel-art"
    />
    {/* легкий затемнитель чтобы не слепило */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
  </div>
</section>


        {/* Contact */}
        <section id="contact" className="pb-20">
          <h2 className="pixel text-xl font-semibold mb-4">Contact</h2>
          <ContactCard />
        </section>
      </main>
    </div>
  );
}
