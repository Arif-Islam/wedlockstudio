"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 1600;

const statCardClassName =
    "rounded-xl bg-white/80 backdrop-blur-sm border border-gold/10 px-5 py-4 shadow-sm " +
    "scale-100 translate-y-0 transform-gpu origin-center " +
    "transition-[transform,border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.45,0,0.55,1)] " +
    "motion-safe:hover:scale-[1.035] motion-safe:hover:-translate-y-1.5 " +
    "hover:border-gold/55 hover:shadow-[0_10px_36px_-8px_rgba(219,167,61,0.22)]";

function easeOutCubic(t: number) {
    return 1 - (1 - t) ** 3;
}

type AboutAnimatedStatProps = {
    label: string;
    target: number;
    /** Shown immediately after the number, e.g. "+" or "%" */
    suffix: string;
};

export function AboutAnimatedStat({ label, target, suffix }: AboutAnimatedStatProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        const valueEl = valueRef.current;
        if (!root || !valueEl) return;

        const finalText = `${target}${suffix}`;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            valueEl.textContent = finalText;
            return;
        }

        let rafId = 0;
        let started = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started) return;
                started = true;
                observer.disconnect();

                const startTime = performance.now();
                const tick = (now: number) => {
                    const t = Math.min(1, (now - startTime) / DURATION_MS);
                    const n = Math.round(easeOutCubic(t) * target);
                    valueEl.textContent = `${n}${suffix}`;
                    if (t < 1) rafId = requestAnimationFrame(tick);
                    else valueEl.textContent = finalText;
                };
                rafId = requestAnimationFrame(tick);
            },
            { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
        );

        observer.observe(root);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafId);
        };
    }, [target, suffix]);

    return (
        <div ref={rootRef} className={statCardClassName}>
            <h3
                ref={valueRef}
                className="text-2xl sm:text-3xl font-bold text-black tabular-nums"
            >
                {`0${suffix}`}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">{label}</p>
        </div>
    );
}
