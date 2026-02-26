"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden">
            {/* Background Video (Vimeo) */}
            <div className="absolute inset-0 w-full h-full">
                {/* Poster image - shown until video loads */}
                <div
                    className={`absolute inset-0 z-5 transition-opacity duration-700 ${
                        videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                    aria-hidden={videoLoaded}
                >
                    <Image
                        src="/teaser2.png"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay */}
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
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                    You Keep the <span className="text-gold">Memories</span>
                    <br />
                    Because Every Moment <span className="text-gold">Matters</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up delay-100">
                    We are WedLockStudio, a professional video editing agency dedicated to transforming your raw footage into cinematic masterpieces.
                </p>
                <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-gold text-black px-8 py-3 rounded-full font-bold shadow-lg shadow-gold/20 hover:scale-105 hover:shadow-xl hover:shadow-gold/40 transition-all duration-300 animate-fade-in-up delay-100"
                >
                    Get In Touch
                    <ArrowRight size={20} />
                </Link>
            </div>
        </section>
    );
}
