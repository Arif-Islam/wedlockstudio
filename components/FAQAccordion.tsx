"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FAQItem = {
    question: string;
    answer: string;
};

type FAQAccordionProps = {
    faqs: FAQItem[];
};

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [panelHeights, setPanelHeights] = useState<number[]>([]);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
    const faqContentKey = faqs.map((faq) => `${faq.question}\u0000${faq.answer}`).join("\u0001");

    useEffect(() => {
        const measurePanels = () => {
            setPanelHeights(panelRefs.current.map((panel) => panel?.scrollHeight ?? 0));
        };

        measurePanels();
        window.addEventListener("resize", measurePanels);

        return () => window.removeEventListener("resize", measurePanels);
    }, [faqContentKey, faqs.length]);

    useEffect(() => {
        if (openIndex === null) return;

        const timer = window.setTimeout(() => {
            const card = cardRefs.current[openIndex];
            if (!card) return;

            const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
            const topPadding = headerHeight + 18;
            const bottomPadding = 28;
            const rect = card.getBoundingClientRect();
            const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

            if (rect.top < topPadding) {
                window.scrollTo({
                    top: window.scrollY + rect.top - topPadding,
                    behavior,
                });
                return;
            }

            if (rect.bottom > window.innerHeight - bottomPadding) {
                window.scrollTo({
                    top: window.scrollY + rect.bottom - window.innerHeight + bottomPadding,
                    behavior,
                });
            }
        }, 520);

        return () => window.clearTimeout(timer);
    }, [openIndex]);

    const toggleFAQ = (index: number) => {
        setOpenIndex((current) => (current === index ? null : index));
    };

    return (
        <div className="faq-accordion-grid mx-auto grid max-w-6xl items-start gap-4 lg:grid-cols-2 lg:gap-5">
            {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const panelId = `faq-panel-${index}`;
                const buttonId = `faq-button-${index}`;

                return (
                    <div
                        key={faq.question}
                        ref={(node) => {
                            cardRefs.current[index] = node;
                        }}
                        className={cn(
                                "faq-card group overflow-hidden rounded-lg border bg-white shadow-[0_14px_42px_-38px_rgba(0,0,0,0.65)] transition-all duration-300",
                            isOpen
                                ? "border-gold/45 bg-white shadow-[0_22px_60px_-44px_rgba(0,0,0,0.78)]"
                                : "border-black/10 hover:border-black/20 hover:bg-white"
                        )}
                    >
                        <button
                            id={buttonId}
                            type="button"
                            onClick={() => toggleFAQ(index)}
                            className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-5 text-left focus:outline-none sm:px-6"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                        >
                            <span className="flex min-w-0 gap-4">
                                <span
                                    className={cn(
                                        "mt-0.5 text-xs font-extrabold uppercase tracking-[0.2em] transition-colors",
                                        isOpen ? "text-gold" : "text-neutral-400"
                                    )}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="text-base font-bold leading-6 text-neutral-800 transition-colors sm:text-lg sm:leading-7">
                                    {faq.question}
                                </span>
                            </span>

                            <span
                                className={cn(
                                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                                    isOpen
                                        ? "border-gold bg-gold text-black"
                                        : "border-black/10 bg-white text-neutral-500 group-hover:border-gold/50 group-hover:text-[#b57900]"
                                )}
                                aria-hidden="true"
                            >
                                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            </span>
                        </button>

                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className={cn(
                                "overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                isOpen ? "opacity-100" : "opacity-0"
                            )}
                            style={{ maxHeight: isOpen ? panelHeights[index] ?? 240 : 0 }}
                        >
                            <div
                                ref={(node) => {
                                    panelRefs.current[index] = node;
                                }}
                                className="px-5 pb-5 sm:px-6 sm:pb-6"
                            >
                                <div className="border-l-2 border-gold/55 pl-4">
                                    <p className="text-sm leading-7 text-neutral-600 sm:text-[15px]">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
