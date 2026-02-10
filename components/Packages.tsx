"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const weeklyPackages = [
    {
        name: "Basic",
        price: "$199",
        description: "Perfect for short edits and reels.",
        features: ["2 Videos per week", "Basic Color Grading", "Simple Transitions", "2 Revision Rounds"],
    },
    {
        name: "Pro",
        price: "$399",
        description: "Ideal for content creators.",
        features: ["4 Videos per week", "Advanced Color Grading", "Sound Design", "Unlimited Revisions"],
        popular: true,
    },
    {
        name: "Agency",
        price: "$699",
        description: "For high-volume needs.",
        features: ["Daily Videos", "Premium Effects", "Dedicated Editor", "24h Turnaround"],
    },
];

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

    const packages = activeTab === "weekly" ? weeklyPackages : monthlyPackages;

    return (
        <section
            id="packages"
            className="relative py-20 md:py-28 overflow-hidden text-black"
            style={{
                background: "linear-gradient(180deg, #fdfbf7 0%, #faf9f6 50%, #f7f5f1 100%)",
            }}
        >
            {/* Decorative background orbs */}
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gold/4 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[320px] h-[320px] bg-gold/3 rounded-full blur-3xl -translate-x-1/3 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="text-left w-full md:w-auto">
                        <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Pricing</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Our <span className="text-gold">Packages</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl text-base sm:text-lg leading-relaxed">
                            Choose a plan that suits your content needs. Scale up or down at any time.
                        </p>
                    </div>

                    {/* Toggle */}
                    <div className="inline-flex bg-white/70 backdrop-blur-md rounded-full p-1.5 border border-gold/15 shadow-sm shrink-0">
                        <button
                            onClick={() => setActiveTab("weekly")}
                            className={cn(
                                "px-8 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer",
                                activeTab === "weekly"
                                    ? "bg-gold text-black shadow-lg shadow-gold/20"
                                    : "text-gray-500 hover:text-black"
                            )}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setActiveTab("monthly")}
                            className={cn(
                                "px-8 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer",
                                activeTab === "monthly"
                                    ? "bg-gold text-black shadow-lg shadow-gold/20"
                                    : "text-gray-500 hover:text-black"
                            )}
                        >
                            Monthly
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-10 md:gap-8">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={cn(
                                "relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border hover:border-gold/30 transition-all duration-300 flex flex-col shadow-sm",
                                pkg.popular ? "border-gold/40 scale-105 shadow-xl shadow-gold/10 z-10 ring-1 ring-gold/10" : "border-gold/10"
                            )}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-center">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                            <p className="text-gray-600 text-sm mb-6 h-10">{pkg.description}</p>

                            <div className="text-4xl font-bold mb-6 text-black">
                                {pkg.price}
                                <span className="text-lg text-gray-500 font-normal">/{activeTab === 'weekly' ? 'week' : 'mo'}</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-gold" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={cn(
                                "w-full py-3 rounded-lg font-bold transition-transform active:scale-95 cursor-pointer",
                                pkg.popular
                                    ? "bg-gold text-black hover:opacity-90"
                                    : "bg-gray-100 text-black hover:bg-gray-200"
                            )}>
                                Choose Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
