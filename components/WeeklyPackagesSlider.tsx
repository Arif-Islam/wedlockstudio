"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type WeeklyCard = {
    id: number;
    title: string;
    subtitle: string;
    price: number;
    delivery: string;
    features: string[];
    highlighted: boolean;
    ribbon?: string;
};

const weeklyCards: WeeklyCard[] = [
    {
        id: 1,
        title: "Teaser",
        subtitle: "Social-ready recap",
        price: 75,
        delivery: "Delivered in 3 days",
        features: [
            "60-second cinematic edit",
            "Key moments coverage",
            "Social-media optimized",
            "Licensed background music",
        ],
        highlighted: false,
    },
    {
        id: 2,
        title: "Highlight",
        subtitle: "Our most popular edit",
        price: 200,
        delivery: "Delivered in 7 days",
        features: [
            "2–9 min cinematic edit",
            "Color grading included",
            "Custom soundtrack",
            "Dedicated editor",
            "2 revision rounds",
        ],
        highlighted: true,
        ribbon: "Best Value",
        
    },
    {
        id: 3,
        title: "Ceremony Edit",
        subtitle: "Full ceremony capture",
        price: 100,
        delivery: "Delivered in 5 days",
        features: [
            "Full ceremony duration",
            "Multi-camera angles",
            "Speeches & vows included",
            "Professional audio mix",
        ],
        highlighted: false,
    },
    {
        id: 4,
        title: "Long Highlight",
        subtitle: "Extended storytelling",
        price: 250,
        delivery: "Delivered in 10 days",
        features: [
            "10–20 min extended cut",
            "Vows & toasts featured",
            "Advanced color grading",
            "Custom soundtrack",
            "Unlimited revisions",
        ],
        highlighted: false,
    },
    {
        id: 5,
        title: "Full Documentary",
        subtitle: "The complete story",
        price: 300,
        delivery: "Delivered in 14 days",
        features: [
            "20–60 min full movie",
            "Chronological narrative",
            "Premium color & audio",
            "Dedicated senior editor",
            "Unlimited revisions",
        ],
        highlighted: false,
    },
];

function useVisibleCount() {
    const [count, setCount] = useState(1);
    useEffect(() => {
        const mql2 = window.matchMedia("(min-width: 768px)");
        const mql3 = window.matchMedia("(min-width: 1024px)");
        const update = () => setCount(mql3.matches ? 3 : mql2.matches ? 2 : 1);
        update();
        mql2.addEventListener("change", update);
        mql3.addEventListener("change", update);
        return () => {
            mql2.removeEventListener("change", update);
            mql3.removeEventListener("change", update);
        };
    }, []);
    return count;
}

const GAP = 24;
const TRANSITION = "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)";

export default function WeeklyPackagesSlider() {
    const visibleCount = useVisibleCount();
    const maxIndex = weeklyCards.length - visibleCount;
    const [index, setIndex] = useState(0);
    const [hasAppeared, setHasAppeared] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(0);

    const clampedIndex = Math.min(index, maxIndex);
    if (clampedIndex !== index) {
        setIndex(clampedIndex);
    }

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const ro = new ResizeObserver((entries) => {
            const w = entries[0].contentRect.width;
            setCardWidth((w - GAP * (visibleCount - 1)) / visibleCount);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [visibleCount]);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAppeared(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
    const goNext = useCallback(
        () => setIndex((i) => Math.min(maxIndex, i + 1)),
        [maxIndex]
    );

    const translateX = index * (cardWidth + GAP);

    return (
        <div ref={wrapperRef} className="w-full">
            <div className="overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex"
                    style={{
                        gap: GAP,
                        transform: `translate3d(-${translateX}px, 0, 0)`,
                        transition: TRANSITION,
                    }}
                >
                    {weeklyCards.map((card, i) => (
                        <div
                            key={card.id}
                            className={cn(
                                "shrink-0 transition-[opacity,transform]",
                                hasAppeared
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-6"
                            )}
                            style={{
                                width: cardWidth || "100%",
                                transitionDuration: "1000ms",
                                transitionTimingFunction:
                                    "cubic-bezier(0.22, 1, 0.36, 1)",
                                transitionDelay: hasAppeared
                                    ? `${i * 90}ms`
                                    : "0ms",
                            }}
                        >
                            <Card card={card} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Arrows */}
            <div className="flex justify-center gap-4 mt-10">
                <button
                    onClick={goPrev}
                    disabled={index === 0}
                    aria-label="Previous"
                    className={cn(
                        "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
                        "border shadow-sm",
                        index === 0
                            ? "border-gray-200 text-gray-300 cursor-default"
                            : "border-gold/30 text-black hover:bg-gold hover:text-black hover:shadow-gold/20"
                    )}
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={goNext}
                    disabled={index >= maxIndex}
                    aria-label="Next"
                    className={cn(
                        "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
                        "border shadow-sm",
                        index >= maxIndex
                            ? "border-gray-200 text-gray-300 cursor-default"
                            : "border-gold/30 text-black hover:bg-gold hover:text-black hover:shadow-gold/20"
                    )}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}

function Card({ card }: { card: WeeklyCard }) {
    const hl = card.highlighted;

    return (
        <div
            className={cn(
                "relative rounded-2xl overflow-hidden flex flex-col h-full",
                hl
                    ? "shadow-xl shadow-gold/15 ring-1 ring-gold/25"
                    : "shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_30px_-6px_rgba(219,167,61,0.18)] hover:border-gold/25"
            )}
            style={{
                transition:
                    "translate 400ms ease-out, box-shadow 400ms ease-out, border-color 400ms ease-out",
            }}
            onMouseEnter={(e) => {
                if (!hl) e.currentTarget.style.translate = "0 -5px";
            }}
            onMouseLeave={(e) => {
                if (!hl) e.currentTarget.style.translate = "";
            }}
        >
            {/* Ribbon */}
            {card.ribbon && (
                <div className="absolute top-10 right-[-30px] rotate-45 bg-gold text-black text-xs font-bold uppercase tracking-wider px-10 py-1 shadow-sm z-20">
                    {card.ribbon}
                </div>
            )}

            {/* ── 1. Header Bar ── */}
            <div
                className={cn(
                    "px-6 pt-7 pb-5 text-center",
                    hl
                        ? "bg-linear-to-br from-[#d4a63a] via-[#c9a033] to-[#a88425]"
                        : "bg-[#eeede9]"
                )}
            >
                <h3
                    className={cn(
                        "text-[20px] font-bold tracking-tight",
                        hl ? "text-white" : "text-gray-900"
                    )}
                >
                    {card.title}
                </h3>
                <p
                    className={cn(
                        "text-sm mt-1",
                        hl ? "text-white/75" : "text-gray-400"
                    )}
                >
                    {card.subtitle}
                </p>
            </div>

            {/* ── 2. Pricing ── */}
            <div
                className={cn(
                    "px-6 pt-6 pb-5 text-center",
                    hl ? "bg-linear-to-b from-[#a88425] to-[#1a1a1a]" : "bg-white"
                )}
            >
                <div className="flex items-baseline justify-center gap-1">
                    <span
                        className={cn(
                            "text-[2.75rem] leading-none font-extrabold tracking-tight",
                            hl ? "text-gold" : "text-gray-900"
                        )}
                    >
                        ${card.price}
                    </span>
                </div>
                <p
                    className={cn(
                        "text-sm mt-2",
                        hl ? "text-gray-400" : "text-gray-400"
                    )}
                >
                    {card.delivery}
                </p>
            </div>

            {/* ── 3. Features ── */}
            <div
                className={cn(
                    "flex-1 px-6 py-6",
                    hl ? "bg-[#1a1a1a]" : "bg-white"
                )}
            >
                <ul className="space-y-3">
                    {card.features.map((f, i) => (
                        <li
                            key={i}
                            className={cn(
                                "text-sm text-center leading-snug",
                                hl ? "text-gray-300" : "text-gray-500"
                            )}
                        >
                            {f}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── 4. CTA ── */}
            <div
                className={cn(
                    "px-6 pb-7 pt-2",
                    hl ? "bg-[#1a1a1a]" : "bg-white"
                )}
            >
                <a
                    href="#contact"
                    className={cn(
                        "block w-full py-3 rounded-full text-sm font-semibold tracking-wide text-center cursor-pointer transition-all duration-300",
                        hl
                            ? "bg-gold text-black hover:brightness-110 shadow-md shadow-gold/20"
                            : "border border-gray-400 text-gray-700 hover:border-gold/40 hover:text-black hover:shadow-sm hover:bg-[#fafafa]"
                    )}
                >
                    Get In Touch
                </a>
            </div>
        </div>
    );
}
