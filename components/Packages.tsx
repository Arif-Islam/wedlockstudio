"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import WeeklyPackagesSlider from "@/components/WeeklyPackagesSlider";

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

export default function Packages() {
    const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

    return (
        <section
            id="packages"
            className="relative overflow-hidden bg-[#faf8f3] py-16 text-black md:py-22"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-9 flex flex-col gap-5 md:mb-11 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl text-left">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-gold">Pricing</p>
                        <h2 className="mb-3 text-3xl font-bold leading-tight tracking-normal md:text-4xl lg:text-5xl">
                            Our <span className="text-gold">Packages</span>
                        </h2>
                        <p className="max-w-xl text-sm leading-7 text-neutral-600 sm:text-base">
                            Choose a weekly edit or a monthly post-production rhythm with clean delivery,
                            clear revisions, and polished final exports.
                        </p>
                    </div>

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
                            Weekly
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
                            Monthly
                        </button>
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
                                    <div className="mb-4 w-fit rounded-full bg-[#fff4d6] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#9f6f0a]">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="mb-1 text-xl font-bold">{pkg.name}</h3>
                                <p className="mb-5 min-h-10 text-sm leading-6 text-neutral-600">{pkg.description}</p>

                                <div className="mb-5 text-3xl font-bold text-black">
                                    {pkg.price}
                                    <span className="text-base font-medium text-neutral-500">/mo</span>
                                </div>

                                <ul className="mb-6 flex-1 space-y-3">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-neutral-700">
                                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f2ead8]">
                                                <Check size={12} className="text-[#b78114]" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a href="#contact" className={cn(
                                    "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-bold transition-all duration-300 active:scale-[0.98] cursor-pointer",
                                    pkg.popular
                                        ? "bg-[#181714] text-white hover:bg-black"
                                        : "bg-[#ede7dc] text-black hover:bg-[#e2dacd]"
                                )}>
                                    Get In Touch <ArrowRight size={16} />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
