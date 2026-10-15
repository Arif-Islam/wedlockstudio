"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import WeeklyPackagesSlider from "@/components/WeeklyPackagesSlider";
import { useLanguage } from "@/lib/i18n";

const monthlyPackages = [
    {
        name: "Basic",
        price: "$799",
        description: "Perfect for short edits and reels.",
        features: ["10 Videos per month", "Basic Color Grading", "Simple Transitions", "2 Revision Rounds"],
    },
    {
        name: "Pro",
        price: "$1499",
        description: "Ideal for content creators.",
        features: ["20 Videos per month", "Advanced Color Grading", "Sound Design", "Unlimited Revisions"],
        popular: true,
    },
    {
        name: "Agency",
        price: "$2999",
        description: "For high-volume needs.",
        features: ["Daily Videos", "Premium Effects", "Dedicated Editor", "24h Turnaround"],
    },
];

const packageNotes = [
    { label: "Weekly edits", value: "Fast single-video delivery" },
    { label: "Monthly plans", value: "Consistent content volume" },
    { label: "Revisions", value: "Clear review rounds" },
];

export default function Packages() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

    return (
        <section
            id="packages"
            className="relative overflow-hidden bg-[#fdfdfb] py-16 text-black md:py-22"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-9 grid gap-6 md:mb-11 lg:grid-cols-[minmax(0,0.95fr)_minmax(440px,0.85fr)] lg:items-start lg:gap-12">
                    <div className="max-w-2xl text-left">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-gold">{t("Pricing")}</p>
                        <h2 className="mb-3 text-3xl font-bold leading-tight tracking-normal md:text-4xl lg:text-5xl">
                            {t("Our")} <span className="text-gold">{t("Packages")}</span>
                        </h2>
                        <p className="max-w-xl text-sm leading-7 text-neutral-600 sm:text-base">
                            {t("Choose a weekly edit or a monthly post-production rhythm with clean delivery, clear revisions, and polished final exports.")}
                        </p>
                    </div>

                    <div className="w-full">
                        <div className="grid gap-2 sm:grid-cols-3">
                            {packageNotes.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-md border border-black/10 bg-white px-4 py-3 shadow-[0_14px_34px_-32px_rgba(0,0,0,0.48)]"
                                >
                                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#b78114]">
                                        {t(item.label)}
                                    </p>
                                    <p className="mt-1 text-sm leading-5 text-neutral-600">
                                        {t(item.value)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 flex flex-col gap-3 border-t border-black/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="max-w-xs text-sm leading-6 text-neutral-500">
                                {t("Pick the cadence first, then choose the edit scope that fits the project.")}
                            </p>

                            {/* Toggle */}
                            <div className="inline-flex w-full rounded-md border border-black/10 bg-white p-1 shadow-[0_14px_36px_-30px_rgba(0,0,0,0.55)] sm:w-auto">
                                <button
                                    onClick={() => setActiveTab("weekly")}
                                    className={cn(
                                        "min-h-10 flex-1 rounded-sm px-6 text-sm font-semibold transition-all duration-300 cursor-pointer sm:flex-none",
                                        activeTab === "weekly"
                                            ? "bg-[#181714] text-white"
                                            : "text-neutral-500 hover:bg-black/5 hover:text-black"
                                    )}
                                >
                                    {t("Weekly")}
                                </button>
                                <button
                                    onClick={() => setActiveTab("monthly")}
                                    className={cn(
                                        "min-h-10 flex-1 rounded-sm px-6 text-sm font-semibold transition-all duration-300 cursor-pointer sm:flex-none",
                                        activeTab === "monthly"
                                            ? "bg-[#181714] text-white"
                                            : "text-neutral-500 hover:bg-black/5 hover:text-black"
                                    )}
                                >
                                    {t("Monthly")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weekly → slider | Monthly → grid */}
                {activeTab === "weekly" ? (
                    <WeeklyPackagesSlider />
                ) : (
                    <div key="monthly" className="grid gap-4 md:grid-cols-3 lg:gap-5">
                        {monthlyPackages.map((pkg, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative flex flex-col rounded-lg border bg-white p-5 shadow-[0_18px_44px_-38px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_24px_54px_-40px_rgba(0,0,0,0.72)] sm:p-6",
                                    "animate-[packages-card-enter_700ms_cubic-bezier(0.22,1,0.36,1)_both]",
                                    pkg.popular ? "border-[#dba73d]/70 ring-1 ring-[#dba73d]/30" : "border-black/10"
                                )}
                                style={{ animationDelay: `${index * 120}ms` }}
                            >
                                {pkg.popular && (
                                    <div className="mb-4 w-fit rounded-full bg-[#fff7df] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#9f6f0a]">
                                        {t("Most Popular")}
                                    </div>
                                )}

                                <h3 className="mb-1 text-xl font-bold">{t(pkg.name)}</h3>
                                <p className="mb-5 min-h-10 text-sm leading-6 text-neutral-600">{t(pkg.description)}</p>

                                <div className="mb-5 text-3xl font-bold text-black">
                                    {pkg.price}
                                    <span className="text-base font-medium text-neutral-500">{t("/mo")}</span>
                                </div>

                                <ul className="mb-6 flex-1 space-y-3">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-neutral-700">
                                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fbf3dd]">
                                                <Check size={12} className="text-[#b78114]" />
                                            </div>
                                            {t(feature)}
                                        </li>
                                    ))}
                                </ul>

                                <a href="#contact" className={cn(
                                    "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-bold transition-all duration-300 active:scale-[0.98] cursor-pointer",
                                    pkg.popular
                                        ? "bg-[#181714] text-white hover:bg-black"
                                        : "border border-black/10 bg-[#fbfbf8] text-black hover:bg-white"
                                )}>
                                    {t("Get In Touch")} <ArrowRight size={16} />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
