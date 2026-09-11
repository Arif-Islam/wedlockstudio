"use client";

import { useState } from "react";
import { Check } from "lucide-react";
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
            className="relative py-20 md:py-28 overflow-hidden text-black bg-[#f4f1eb]"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="text-left w-full md:w-auto">
                        <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Pricing</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Our <span className="text-gold">Packages</span>
                        </h2>
                        <p className="text-neutral-600 max-w-xl text-base sm:text-lg leading-relaxed">
                            Choose a plan that suits your content needs. Scale up or down at any time.
                        </p>
                    </div>

                    {/* Toggle */}
                    <div className="inline-flex bg-[#ebe6dc] rounded-md p-1.5 border border-black/10 shrink-0">
                        <button
                            onClick={() => setActiveTab("weekly")}
                            className={cn(
                                "px-8 py-2 rounded-sm text-sm font-semibold transition-all duration-300 cursor-pointer",
                                activeTab === "weekly"
                                    ? "bg-[#181714] text-white"
                                    : "text-neutral-600 hover:text-black"
                            )}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setActiveTab("monthly")}
                            className={cn(
                                "px-8 py-2 rounded-sm text-sm font-semibold transition-all duration-300 cursor-pointer",
                                activeTab === "monthly"
                                    ? "bg-[#181714] text-white"
                                    : "text-neutral-600 hover:text-black"
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
                    <div key="monthly" className="grid md:grid-cols-3 gap-10 md:gap-8">
                        {monthlyPackages.map((pkg, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative bg-[#fbfaf7] rounded-lg p-8 border hover:border-black/25 flex flex-col shadow-[0_16px_48px_-36px_rgba(0,0,0,0.65)]",
                                    "animate-[packages-card-enter_700ms_cubic-bezier(0.22,1,0.36,1)_both]",
                                    pkg.popular ? "border-black/25 scale-105 z-10 ring-1 ring-black/10" : "border-black/10"
                                )}
                                style={{ animationDelay: `${index * 120}ms` }}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide text-center">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                                <p className="text-gray-600 text-sm mb-6 h-10">{pkg.description}</p>

                                <div className="text-4xl font-bold mb-6 text-black">
                                    {pkg.price}
                                    <span className="text-lg text-gray-500 font-normal">/mo</span>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                            <div className="w-5 h-5 rounded-full bg-[#ece4d1] flex items-center justify-center shrink-0">
                                                <Check size={12} className="text-gold" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a href="#contact" className={cn(
                                    "w-full text-center py-3 rounded-md font-bold transition-transform active:scale-95 cursor-pointer",
                                    pkg.popular
                                        ? "bg-[#181714] text-white hover:bg-black"
                                        : "bg-[#e8e3d8] text-black hover:bg-[#ded7c9]"
                                )}>
                                    Get In Touch
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
