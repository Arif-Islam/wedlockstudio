"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Wedding Filmmaker",
        category: "Wedding Film",
        result: "Story-first color and pacing",
        review: "Absolutely stunning work! The color grading brought my wedding video to life in ways I never imagined. I was worried that we didn't have enough shots of just the bride and groom but you used the candid moments PERFECTLY and crafted a beautiful story.",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056566/client1_qr0ntg.jpg",
    },
    {
        id: 2,
        name: "Mark Thompson",
        role: "Studio Owner",
        category: "Studio Retainer",
        result: "Fast, reliable delivery",
        review: "Professional, fast, and incredibly creative. They understood my brand identity from the very first draft. The turnaround times are incredibly fast, making them a reliable part of our project timelines. They have never missed a deadline.",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770057019/client2_mjfddl.jpg",
    },
    {
        id: 3,
        name: "Emily Chen",
        role: "Travel Creator",
        category: "Creator Edits",
        result: "Cinematic sound and rhythm",
        review: "The sound design was next level. I've never seen my travel vlogs look this cinematic and engaging. It's been difficult to find an editor that is willing to work with our style, but their edits felt like one of our own.",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056617/client3_rbbcgs.jpg",
    },
    {
        id: 4,
        name: "David Miller",
        role: "Production Lead",
        category: "Event Production",
        result: "Deadline-safe workflow",
        review: "A true partner in production. They handled our tight deadlines with ease without compromising quality. This efficiency is invaluable and has made them an integral part of our workflow.",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056566/client1_qr0ntg.jpg",
    },
    {
        id: 5,
        name: "Jessica Alba",
        role: "Brand Producer",
        category: "Brand Content",
        result: "Precise review notes",
        review: "Every frame was polished to perfection. Hands down the best editing team I've worked with so far. Changes are quick, the platform for comments is easy to use and very specific. Overall exceeded my expectations.",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770057019/client2_mjfddl.jpg",
    },
];

const proofItems = [
    { value: "1000+", label: "Projects Completed" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "3-14", label: "Day Delivery" },
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = testimonials[activeIndex];

    return (
        <section
            id="testimonials"
            className="relative overflow-hidden bg-[#f7f4ee] py-14 text-black md:py-20 lg:py-24"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-5 md:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-gold">
                            Testimonials
                        </p>
                        <h2 className="text-3xl font-bold leading-tight tracking-normal sm:text-4xl lg:text-5xl">
                            Client stories with a <span className="text-gold">finished-film feel</span>
                        </h2>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base lg:max-w-md lg:text-right">
                        Real feedback from filmmakers, studios, and creators who trust WedLockStudio
                        to shape their edits with polish and care.
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-black/10 bg-[#181714] shadow-[0_34px_90px_-58px_rgba(0,0,0,0.95)]">
                    <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[590px]">
                            <Image
                                key={active.image}
                                src={active.image}
                                alt={active.name}
                                fill
                                sizes="(min-width: 1024px) 42vw, 100vw"
                                className="object-cover transition-opacity duration-500"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                                <div className="mb-3 w-fit rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold backdrop-blur sm:text-[11px] sm:tracking-[0.22em]">
                                    {active.category}
                                </div>
                                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                                    {active.name}
                                </h3>
                                <p className="mt-1 text-sm font-medium text-white/70">{active.role}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between p-5 text-white sm:p-7 lg:min-h-[590px] lg:p-10">
                            <div>
                                <div className="mb-5 flex items-center justify-between gap-4 sm:mb-7">
                                    <div className="flex gap-1 text-gold">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Star key={index} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" fill="currentColor" />
                                        ))}
                                    </div>
                                    <Quote className="h-8 w-8 text-gold/80 sm:h-[38px] sm:w-[38px]" aria-hidden="true" />
                                </div>

                                <p className="max-w-3xl text-base font-semibold leading-7 text-white sm:text-lg sm:leading-8 md:text-xl md:leading-9 lg:text-[1.7rem] lg:leading-[1.55]">
                                    &ldquo;{active.review}&rdquo;
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/70 sm:text-xs sm:tracking-[0.18em]">
                                        <BadgeCheck size={14} className="text-gold" />
                                        Verified Client
                                    </span>
                                    <span className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/70 sm:text-xs sm:tracking-[0.18em]">
                                        {active.result}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-white/10 pt-5 sm:mt-10 sm:pt-6">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
                                        Client Notes
                                    </p>
                                    <p className="text-sm text-white/45">
                                        {activeIndex + 1} / {testimonials.length}
                                    </p>
                                </div>

                                <div className="grid gap-3 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                    {testimonials.map((testimonial, index) => {
                                        const selected = index === activeIndex;

                                        return (
                                            <button
                                                key={testimonial.id}
                                                onClick={() => setActiveIndex(index)}
                                                className={cn(
                                                    "rounded-md border p-2 text-left transition-all duration-300 cursor-pointer",
                                                    selected
                                                        ? "border-gold bg-gold text-black"
                                                        : "border-white/10 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.08]"
                                                )}
                                                aria-pressed={selected}
                                            >
                                                <span className="mb-2 flex items-center gap-2">
                                                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                                                        <Image
                                                            src={testimonial.image}
                                                            alt={testimonial.name}
                                                            fill
                                                            sizes="36px"
                                                            className="object-cover"
                                                        />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block truncate text-xs font-bold">
                                                            {testimonial.name}
                                                        </span>
                                                        <span
                                                            className={cn(
                                                                "block truncate text-[11px]",
                                                                selected ? "text-black/65" : "text-white/45"
                                                            )}
                                                        >
                                                            {testimonial.role}
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 grid overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_20px_52px_-44px_rgba(0,0,0,0.65)] sm:grid-cols-3">
                    {proofItems.map((item, index) => (
                        <div
                            key={item.label}
                            className={cn(
                                "flex min-h-20 items-center justify-between gap-4 px-5 py-4 sm:block sm:min-h-0 sm:px-5 sm:py-5 md:px-6",
                                index > 0 && "border-t border-black/10 sm:border-t-0 sm:border-l"
                            )}
                        >
                            <p className="text-2xl font-extrabold leading-none text-[#181714] sm:text-3xl">
                                {item.value}
                            </p>
                            <p className="text-right text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500 sm:mt-2 sm:text-left sm:text-xs sm:tracking-[0.16em] lg:tracking-[0.18em]">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
