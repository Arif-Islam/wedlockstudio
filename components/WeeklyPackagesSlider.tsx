"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
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

const GAP = 18;
const TRANSITION = "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)";

export default function WeeklyPackagesSlider() {
    const visibleCount = useVisibleCount();
    const maxIndex = weeklyCards.length - visibleCount;
    const [index, setIndex] = useState(0);
    const [hasAppeared, setHasAppeared] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(0);

    const clampedIndex = Math.min(index, maxIndex);

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

    const goPrev = useCallback(
        () => setIndex((i) => Math.max(0, Math.min(i, maxIndex) - 1)),
        [maxIndex]
    );
    const goNext = useCallback(
        () => setIndex((i) => Math.min(maxIndex, i + 1)),
        [maxIndex]
    );

    const translateX = clampedIndex * (cardWidth + GAP);

    return (
        <div ref={wrapperRef} className="w-full">
            <div className="overflow-hidden rounded-lg">
                <div
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
            <div className="mt-7 flex justify-center gap-3">
                <button
                    onClick={goPrev}
                    disabled={clampedIndex === 0}
                    aria-label="Previous"
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 cursor-pointer",
                        "border shadow-sm",
                        clampedIndex === 0
                            ? "border-black/10 text-neutral-300 cursor-default"
                            : "border-black/15 bg-white text-black hover:bg-[#181714] hover:text-white"
                    )}
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={goNext}
                    disabled={clampedIndex >= maxIndex}
                    aria-label="Next"
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 cursor-pointer",
                        "border shadow-sm",
                        clampedIndex >= maxIndex
                            ? "border-black/10 text-neutral-300 cursor-default"
                            : "border-black/15 bg-white text-black hover:bg-[#181714] hover:text-white"
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
                "relative flex h-full flex-col overflow-hidden rounded-lg",
                hl
                    ? "bg-[#181714] shadow-[0_26px_62px_-42px_rgba(0,0,0,0.88)] ring-1 ring-black/20"
                    : "border border-black/10 bg-white shadow-[0_16px_42px_-38px_rgba(0,0,0,0.72)] hover:border-black/20 hover:shadow-[0_24px_52px_-40px_rgba(0,0,0,0.78)]"
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
            {card.ribbon && (
                <div className="absolute right-4 top-4 z-20 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-black shadow-sm">
                    {card.ribbon}
                </div>
            )}

            <div
                className={cn(
                    "px-5 pb-4 pt-5 sm:px-6",
                    hl
                        ? "bg-[#181714]"
                        : "bg-white"
                )}
            >
                <p
                    className={cn(
                        "mb-2 text-[11px] font-bold uppercase tracking-[0.24em]",
                        hl ? "text-gold" : "text-[#b78114]"
                    )}
                >
                    Weekly Edit
                </p>
                <h3
                    className={cn(
                        "pr-24 text-xl font-bold tracking-normal",
                        hl ? "text-white" : "text-gray-900"
                    )}
                >
                    {card.title}
                </h3>
                <p
                    className={cn(
                        "mt-1 text-sm leading-6",
                        hl ? "text-white/70" : "text-neutral-500"
                    )}
                >
                    {card.subtitle}
                </p>
            </div>

            <div
                className={cn(
                    "px-5 pb-4 sm:px-6",
                    hl ? "bg-[#181714]" : "bg-white"
                )}
            >
                <div className="flex items-end justify-between gap-4 border-y py-4 border-black/10">
                    <span
                        className={cn(
                            "text-4xl font-extrabold leading-none tracking-normal",
                            hl ? "text-gold" : "text-gray-900"
                        )}
                    >
                        ${card.price}
                    </span>
                    <span
                        className={cn(
                            "mb-0.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                            hl ? "bg-white/[0.08] text-white/70" : "bg-[#fbf7ed] text-neutral-600"
                        )}
                    >
                        <Clock3 size={13} />
                        {card.delivery}
                    </span>
                </div>
            </div>

            <div
                className={cn(
                    "flex-1 px-5 py-4 sm:px-6",
                    hl ? "bg-[#181714]" : "bg-white"
                )}
            >
                <ul className="space-y-2.5">
                    {card.features.map((f, i) => (
                        <li
                            key={i}
                            className={cn(
                                "flex items-start gap-2.5 text-sm leading-6",
                                hl ? "text-gray-300" : "text-neutral-600"
                            )}
                        >
                            <span
                                className={cn(
                                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                                    hl ? "bg-white/10 text-gold" : "bg-[#fbf3dd] text-[#b78114]"
                                )}
                            >
                                <Check size={12} />
                            </span>
                            {f}
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className={cn(
                    "px-5 pb-5 pt-1 sm:px-6",
                    hl ? "bg-[#181714]" : "bg-white"
                )}
            >
                <a
                    href="#contact"
                    className={cn(
                        "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-center cursor-pointer transition-all duration-300",
                        hl
                            ? "bg-gold text-black hover:bg-[#e2b14c]"
                            : "border border-black/15 bg-[#fbfbf8] text-neutral-800 hover:border-black/30 hover:bg-white hover:text-black"
                    )}
                >
                    Get In Touch <ArrowRight size={16} />
                </a>
            </div>
        </div>
    );
}
