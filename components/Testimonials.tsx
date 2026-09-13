"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
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
    { value: "1000+", label: "Projects Completed", detail: "Edited, polished, and delivered" },
    { value: "100%", label: "Client Satisfaction", detail: "Review-ready client workflow" },
    { value: "3-14", label: "Day Delivery", detail: "Fast weekly project rhythm" },
];

const SLIDE_INTERVAL = 6500;

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isInViewport, setIsInViewport] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const active = testimonials[activeIndex];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
            {
                rootMargin: "-12% 0px -18%",
                threshold: 0.2,
            }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isInViewport || isPaused) return;

        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const timer = window.setTimeout(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length);
        }, SLIDE_INTERVAL);

        return () => window.clearTimeout(timer);
    }, [activeIndex, isInViewport, isPaused]);

    const handleSelect = (index: number) => {
        setActiveIndex(index);
        setIsPaused(false);
    };

    const handlePrevious = () => {
        setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
        setIsPaused(false);
    };

    const handleNext = () => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
        setIsPaused(false);
    };

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="relative overflow-hidden bg-[#fdfdfb] py-10 text-black md:py-14 lg:py-20"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-6 max-w-3xl text-center md:mb-8 lg:mb-12">
                    <div className="mb-3 flex items-center justify-center gap-3 md:mb-4">
                        <span className="h-px w-8 bg-gold/55 sm:w-12" aria-hidden="true" />
                        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
                            Testimonials
                        </p>
                        <span className="h-px w-8 bg-gold/55 sm:w-12" aria-hidden="true" />
                    </div>

                    <h2 className="text-2xl font-bold leading-tight tracking-normal text-[#181714] sm:text-3xl md:text-4xl lg:text-5xl">
                        Proof in every <span className="text-gold">finished film</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7 md:mt-4">
                        Real feedback from filmmakers, studios, and creators who trust
                        WedLockStudio for polished edits, clear revisions, and calm delivery.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500 sm:text-xs sm:tracking-[0.16em] md:mt-5">
                        <span className="flex items-center gap-1 text-gold" aria-label="Five star rating">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star key={`intro-star-${index}`} className="h-3.5 w-3.5" fill="currentColor" />
                            ))}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-black/25" aria-hidden="true" />
                        <span>All verified client stories</span>
                    </div>
                </div>

                <div
                    className="overflow-hidden rounded-lg border border-black/10 bg-[#181714] shadow-[0_34px_90px_-58px_rgba(0,0,0,0.95)]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={(event) => {
                        const nextFocused = event.relatedTarget as Node | null;
                        if (!nextFocused || !event.currentTarget.contains(nextFocused)) {
                            setIsPaused(false);
                        }
                    }}
                >
                    <div className="grid min-w-0 lg:grid-cols-[minmax(280px,0.56fr)_minmax(0,1.44fr)]">
                        <div className="hidden border-b border-white/10 p-4 sm:p-6 lg:flex lg:min-h-[560px] lg:items-center lg:border-b-0 lg:border-r lg:p-8">
                            <div className="testimonial-media-enter w-full">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-black sm:aspect-[16/9] lg:aspect-[4/5]">
                                    <Image
                                        src={active.image}
                                        alt={active.name}
                                        fill
                                        sizes="(min-width: 1024px) 28vw, 100vw"
                                        quality={72}
                                        className="object-cover transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/82 via-black/10 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                                        <div className="mb-3 w-fit rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold backdrop-blur sm:text-[11px] sm:tracking-[0.22em]">
                                            {active.category}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-2xl">
                                            {active.name}
                                        </h3>
                                        <p className="mt-1 text-sm font-medium text-white/70">{active.role}</p>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <div className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                                            Focus
                                        </p>
                                        <p className="mt-1 text-sm leading-5 text-white/70">{active.result}</p>
                                    </div>
                                    <div className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                                            Rating
                                        </p>
                                        <p className="mt-1 text-sm leading-5 text-white/70">5-star experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="min-w-0 flex flex-col justify-between p-4 text-white sm:p-6 md:p-8 lg:min-h-[560px] lg:p-10">
                            <div className="mb-5 flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3 shadow-[0_18px_45px_-34px_rgba(0,0,0,0.9)] sm:gap-4 sm:p-4 lg:hidden">
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-white/10 bg-black sm:h-20 sm:w-20">
                                    <Image
                                        src={active.image}
                                        alt={active.name}
                                        fill
                                        sizes="80px"
                                        quality={70}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="mb-1 w-fit rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                                        {active.category}
                                    </p>
                                    <h3 className="truncate text-xl font-bold text-white sm:text-2xl">
                                        {active.name}
                                    </h3>
                                    <p className="mt-1 truncate text-sm font-medium text-white/60">{active.role}</p>
                                </div>
                            </div>

                            <div className="testimonial-copy-enter">
                                <div className="mb-4 flex items-center justify-between gap-4 sm:mb-5 lg:mb-7">
                                    <div className="flex gap-1 text-gold">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Star key={index} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" fill="currentColor" />
                                        ))}
                                    </div>
                                    <Quote className="h-8 w-8 text-gold/80 sm:h-[38px] sm:w-[38px]" aria-hidden="true" />
                                </div>

                                <p className="max-w-4xl text-[1.05rem] font-semibold leading-7 text-white sm:text-lg sm:leading-8 md:text-[1.2rem] md:leading-9 lg:text-[1.7rem] lg:leading-[1.55]">
                                    &ldquo;{active.review}&rdquo;
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 lg:mt-8">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/70 sm:text-xs sm:tracking-[0.18em]">
                                        <BadgeCheck size={14} className="text-gold" />
                                        Verified Client
                                    </span>
                                    <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/70 sm:text-xs sm:tracking-[0.18em]">
                                        {active.result}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-7 border-t border-white/10 pt-4 sm:mt-8 sm:pt-5 lg:mt-10 lg:pt-6">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.24em]">
                                        Client Notes
                                    </p>
                                    <p className="text-sm text-white/45">
                                        {activeIndex + 1} / {testimonials.length}
                                    </p>
                                </div>

                                <div className="lg:hidden">
                                    <div className="flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5">
                                        <button
                                            type="button"
                                            onClick={handlePrevious}
                                            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-black/25 text-white transition-colors hover:border-gold/60 hover:text-gold"
                                            aria-label="Show previous client review"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex min-w-0 items-center justify-center gap-2 rounded-full bg-white/[0.06] px-3 py-2">
                                                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-black">
                                                    <Image
                                                        src={active.image}
                                                        alt={active.name}
                                                        fill
                                                        sizes="36px"
                                                        quality={64}
                                                        className="object-cover"
                                                    />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block truncate text-sm font-bold leading-5 text-white">
                                                        {active.name}
                                                    </span>
                                                    <span className="block truncate text-xs leading-4 text-white/50">
                                                        {active.role}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-black/25 text-white transition-colors hover:border-gold/60 hover:text-gold"
                                            aria-label="Show next client review"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>

                                    <div className="mt-3 flex items-center justify-center gap-2">
                                        {testimonials.map((testimonial, index) => (
                                            <button
                                                key={`mobile-dot-${testimonial.id}`}
                                                type="button"
                                                onClick={() => handleSelect(index)}
                                                className={cn(
                                                    "h-2 rounded-full transition-all",
                                                    index === activeIndex ? "w-6 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"
                                                )}
                                                aria-label={`Show testimonial from ${testimonial.name}`}
                                                aria-pressed={index === activeIndex}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="hidden gap-2.5 lg:grid lg:grid-cols-5">
                                    {testimonials.map((testimonial, index) => {
                                        const selected = index === activeIndex;

                                        return (
                                            <button
                                                key={testimonial.id}
                                                onClick={() => handleSelect(index)}
                                                className={cn(
                                                    "rounded-md border p-2 text-left transition-all duration-300 cursor-pointer",
                                                    selected
                                                        ? "border-gold bg-gold text-black"
                                                        : "border-white/10 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.08]"
                                                )}
                                                aria-pressed={selected}
                                                aria-label={`Show testimonial from ${testimonial.name}`}
                                            >
                                                <span className="mb-2 flex items-center gap-2">
                                                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                                                        <Image
                                                            src={testimonial.image}
                                                            alt={testimonial.name}
                                                            fill
                                                            sizes="36px"
                                                            quality={64}
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

                                <div className="mt-5 h-px overflow-hidden bg-white/10">
                                    <div
                                        key={active.id}
                                        className="testimonial-progress h-full origin-left bg-gold"
                                        style={{ animationPlayState: isInViewport && !isPaused ? "running" : "paused" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border border-black/10 bg-[#181714] p-2 shadow-[0_30px_80px_-58px_rgba(0,0,0,0.95)] sm:p-2.5 lg:mt-5">
                    <div className="grid gap-2 sm:grid-cols-3">
                    {proofItems.map((item, index) => (
                        <div
                            key={item.label}
                            className={cn(
                                "relative overflow-hidden rounded-md border border-white/10 bg-white/[0.045] px-4 py-4 transition-colors duration-300 hover:border-gold/35 hover:bg-white/[0.07] sm:px-5 sm:py-5",
                                index === 1 && "bg-gold text-black hover:bg-[#e5b13b]"
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute right-0 top-0 h-16 w-16 rounded-bl-full",
                                    index === 1 ? "bg-black/10" : "bg-gold/10"
                                )}
                                aria-hidden="true"
                            />
                            <p
                                className={cn(
                                    "mb-3 text-[10px] font-bold uppercase tracking-[0.22em]",
                                    index === 1 ? "text-black/55" : "text-gold"
                                )}
                            >
                                0{index + 1}
                            </p>
                            <div className="flex items-end justify-between gap-4 sm:block xl:flex">
                                <div>
                                    <p
                                        className={cn(
                                            "text-3xl font-extrabold leading-none tracking-normal sm:text-4xl",
                                            index === 1 ? "text-black" : "text-white"
                                        )}
                                    >
                                        {item.value}
                                    </p>
                                    <p
                                        className={cn(
                                            "mt-2 text-[11px] font-bold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]",
                                            index === 1 ? "text-black/70" : "text-white/75"
                                        )}
                                    >
                                        {item.label}
                                    </p>
                                </div>
                                <p
                                    className={cn(
                                        "max-w-[13rem] text-right text-xs leading-5 sm:mt-3 sm:text-left xl:mt-0 xl:text-right",
                                        index === 1 ? "text-black/62" : "text-white/45"
                                    )}
                                >
                                    {item.detail}
                                </p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
