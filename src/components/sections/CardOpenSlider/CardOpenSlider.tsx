"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./CardOpenSlider.module.css";

/**
 * Slider a tutto schermo "card che si apre".
 * Gli elementi NON vanno scritti qui: arrivano dai dati già esistenti della sezione
 * (offerte, eventi…) tramite la prop `items`.
 */
export type CardSlide = {
  id: string;
  /** Riga piccola sopra il titolo (es. "Sardegna · Tutto l'anno") */
  kicker?: string;
  title: string;
  /** Riga sotto il titolo (es. "Regalo di Natale · Estate 2027") */
  subtitle?: string;
  text?: string;
  /** Riga piccola sulla card chiusa (se assente usa `kicker`) */
  cardKicker?: string;
  /** Stessa immagine di copertina già usata nella sezione attuale */
  image: ImageProps["src"];
  alt: string;
  href?: string;
  ctaLabel?: string;
};

type Props = {
  items: CardSlide[];
  /** Titolo della sezione, es. "Offerte & eventi" */
  heading?: string;
  /** id/anchor della sezione attuale, così i link del menu continuano a funzionare */
  id?: string;
  /** ms tra uno slide e l'altro; 0 = niente autoplay */
  interval?: number;
  /** Card visibili in fila */
  visibleCards?: number;
};

const EASE = "cubic-bezier(.7,0,.2,1)";
const DURATION = 900; // ms: deve coincidere con i .9s qui sotto
const MOVE =
  ["left", "top", "width", "height", "border-radius"].map((p) => `${p} .9s ${EASE}`).join(", ") +
  ", opacity .5s";

const FULL: CSSProperties = { left: 0, top: 0, width: "100%", height: "100%", borderRadius: 0 };
const slot = (i: number): CSSProperties => ({
  left: `calc(var(--cx) + ${i} * (var(--cw) + var(--gap)))`,
  top: "calc(100% - var(--ch) - var(--cb))",
  width: "var(--cw)",
  height: "var(--ch)",
  borderRadius: 14,
});

type Leaving = { index: number; phase: "cover" | "jump" } | null;

export default function CardOpenSlider({
  items,
  heading,
  id,
  interval = 5500,
  visibleCards = 3,
}: Props) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<Leaving>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);
  const paused = hovered || !inView || tabHidden;

  const go = (target: number) => {
    if (n < 2 || busy.current) return;
    const next = ((target % n) + n) % n;
    if (next === active) return;
    busy.current = true;
    // 1) la slide uscente resta a tutto schermo sotto quella che si apre
    setLeaving({ index: active, phase: "cover" });
    setActive(next);
    timers.current.push(
      window.setTimeout(() => {
        // 2) appena coperta, salta (invisibile) al suo posto in fila
        setLeaving({ index: active, phase: "jump" });
        // 3) frame successivo: riappare in dissolvenza come card
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setLeaving(null);
            busy.current = false;
          }),
        );
      }, DURATION),
    );
  };

  // Autoplay solo quando la sezione è sullo schermo, non in hover/focus e a scheda visibile
  useEffect(() => {
    if (!interval || paused || n < 2) return;
    const t = window.setTimeout(() => go(active + 1), interval);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, interval, n]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      timers.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  if (n === 0) return null;

  const layer = (i: number): { style: CSSProperties; isCard: boolean } => {
    if (i === active) return { style: { ...FULL, zIndex: 2, opacity: 1, transition: MOVE }, isCard: false };
    const k = (i - active + n) % n; // 1 = prossima
    const pos = k - 1 < visibleCards ? slot(k - 1) : slot(visibleCards);
    const shown = k - 1 < visibleCards;
    if (leaving?.index === i && leaving.phase === "cover")
      return { style: { ...FULL, zIndex: 1, opacity: 1, transition: "none" }, isCard: false };
    if (leaving?.index === i && leaving.phase === "jump")
      return { style: { ...pos, zIndex: shown ? 4 : 1, opacity: 0, transition: "none" }, isCard: false };
    return { style: { ...pos, zIndex: shown ? 4 : 1, opacity: shown ? 1 : 0, transition: MOVE }, isCard: shown };
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={styles.hero}
      aria-roledescription="carosello"
      aria-label={heading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {items.map((item, i) => {
        const { style, isCard } = layer(i);
        return (
          <div key={item.id} className={styles.layer} style={style} aria-hidden={!isCard && i !== active}>
            <Image
              src={item.image}
              alt={i === active ? item.alt : ""}
              fill
              sizes="100vw"
              className={styles.img}
            />
            <div className={styles.cardLabel} style={{ opacity: isCard ? 1 : 0 }}>
              {(item.cardKicker ?? item.kicker) && (
                <div className={styles.cardKicker}>{item.cardKicker ?? item.kicker}</div>
              )}
              <div className={styles.cardTitle}>{item.title}</div>
            </div>
            {isCard && (
              <button
                type="button"
                className={styles.cardButton}
                onClick={() => go(i)}
                aria-label={`Mostra: ${item.title}`}
              />
            )}
          </div>
        );
      })}

      <div className={styles.overlay} aria-hidden="true" />

      {heading && <h2 className={styles.heading}>{heading}</h2>}

      <div className={styles.text} aria-live="polite">
        {items.map((item, i) => {
          const on = i === active;
          return (
            <div key={item.id} className={`${styles.slide} ${on ? styles.slideOn : ""}`} aria-hidden={!on}>
              {item.kicker && <p className={styles.kicker}>{item.kicker}</p>}
              <h3 className={styles.title}>{item.title}</h3>
              {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
              {item.text && <p className={styles.body}>{item.text}</p>}
              {item.href && (
                <a href={item.href} className={styles.cta} tabIndex={on ? 0 : -1}>
                  {item.ctaLabel ?? "Scopri di più"}
                </a>
              )}
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <div className={styles.controls}>
          <button type="button" className={styles.navBtn} onClick={() => go(active - 1)} aria-label="Precedente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className={styles.navBtn} onClick={() => go(active + 1)} aria-label="Successivo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <span className={styles.counter}>
            {String(active + 1).padStart(2, "0")}{" "}
            <span className={styles.counterTotal}>/ {String(n).padStart(2, "0")}</span>
          </span>
          {interval > 0 && (
            <span className={styles.progressTrack} aria-hidden="true">
              <span
                key={active}
                className={styles.progress}
                style={{ animationDuration: `${interval}ms`, animationPlayState: paused ? "paused" : "running" }}
              />
            </span>
          )}
        </div>
      )}
    </section>
  );
}
