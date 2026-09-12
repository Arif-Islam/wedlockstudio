"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const trustItems = [
    "Multi-camera edits supported",
    "Global clients",
    "3-14 day delivery",
    "Wedding | Corporate | Social",
];

export default function Hero() {
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <>
            <section id="hero" className="relative h-screen w-full overflow-hidden">
                {/* Background Video (Vimeo) */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#f4f1eb] to-transparent z-10" />
                    <iframe
                        src="https://player.vimeo.com/video/858749361?autoplay=1&loop=1&muted=1&background=1"
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
                            videoLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                            width: "max(100vw, 177.78vh)",
                            height: "max(56.25vw, 100vh)",
                        }}
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        title="Hero background"
                        onLoad={() => setVideoLoaded(true)}
                    />
                </div>

                {/* Content */}
                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.02] animate-fade-in-up max-w-6xl">
                        Cinematic Wedding Video Editing for
                        <br />
                        <span className="text-gold">Filmmakers, Studios, and Couples</span>
                    </h1>
                    <p className="text-base md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed animate-fade-in-up delay-100">
                        We are WedLockStudio, a professional video editing agency dedicated to transforming your raw footage into cinematic masterpieces.
                    </p>
                    <Link
                        href="#contact"
                        className="inline-flex items-center gap-2 bg-gold text-black px-7 py-3 rounded-md font-bold shadow-[0_12px_28px_-18px_rgba(0,0,0,0.8)] hover:bg-[#e2b14c] hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up delay-100"
                    >
                        Get In Touch
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <div className="bg-[#181714] border-y border-black/10 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 border-x border-white/10">
                        {trustItems.map((item, index) => (
                            <div
                                key={item}
                                className={`flex min-h-[72px] items-center justify-center px-4 py-3 text-center text-[10px] font-semibold uppercase leading-normal tracking-[0.1em] text-neutral-200 min-[420px]:tracking-[0.12em] sm:min-h-20 sm:px-5 sm:text-xs sm:tracking-[0.14em] lg:min-h-[76px] lg:px-6 lg:text-[11px] lg:tracking-[0.12em] xl:px-8 xl:text-xs xl:tracking-[0.13em] 2xl:text-[13px] ${
                                    index % 2 === 1 ? "border-l border-white/10" : ""
                                } ${index > 1 ? "border-t border-white/10 lg:border-t-0" : ""} ${
                                    index > 0 ? "lg:border-l lg:border-white/10" : ""
                                }`}
                            >
                                <span className="block min-[420px]:whitespace-nowrap">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
