"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                >
                    <source src="https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770059294/hero-bg_aw6gge.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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
