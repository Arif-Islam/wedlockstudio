import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";

const trustItems = [
    "Multi-camera edits supported",
    "Global clients",
    "3-14 day delivery",
    "Wedding | Corporate | Social",
];

export default function Hero() {
    return (
        <>
            <section id="hero" className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto,w_1800/v1772134779/teaser_2_sqy9xv.png"
                        alt=""
                        fill
                        priority
                        quality={72}
                        sizes="100vw"
                        className="object-cover"
                    />
                    <HeroBackgroundVideo />
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#f4f1eb] to-transparent z-10" />
                </div>

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
                        className="group relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-full border border-gold/50 bg-gold px-5 py-2 font-bold text-black shadow-[0_22px_60px_-28px_rgba(0,0,0,0.95)] ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold hover:shadow-[0_30px_90px_-24px_rgba(224,173,56,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0 animate-fade-in-up delay-100 sm:min-h-16 sm:px-6"
                        aria-label="Get in touch with WedLockStudio"
                    >
                        <span className="absolute inset-0 bg-linear-to-r from-[#c98e23] via-[#f4cf72] to-[#dfa834] opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                        <span className="absolute inset-0 bg-[#11100d] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="absolute inset-y-0 -left-2/3 w-1/2 skew-x-[-18deg] bg-linear-to-r from-transparent via-gold/45 to-transparent opacity-0 blur-sm transition-all duration-700 group-hover:left-[125%] group-hover:opacity-100" />
                        <span className="relative whitespace-nowrap px-1 text-sm uppercase tracking-[0.14em] transition-colors duration-300 sm:text-base">
                            Get In Touch
                        </span>
                        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-gold shadow-inner transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-[-8deg] group-hover:bg-gold group-hover:text-black group-hover:shadow-[0_0_24px_rgba(224,173,56,0.45)] sm:h-11 sm:w-11">
                            <ArrowRight size={20} strokeWidth={2.6} />
                        </span>
                    </Link>
                </div>
            </section>

            <div className="bg-[#181714] border-y border-black/10 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 border-x border-white/10">
                        {trustItems.map((item, index) => (
                            <div
                                key={item}
                                className={`flex min-h-[72px] items-center justify-center px-4 py-3 text-center text-[10px] font-semibold uppercase leading-normal tracking-[0.1em] text-neutral-200 min-[420px]:tracking-[0.12em] sm:min-h-20 sm:px-5 sm:text-xs sm:tracking-[0.14em] lg:min-h-[56px] lg:px-6 lg:text-[11px] lg:tracking-[0.12em] xl:px-8 xl:text-xs xl:tracking-[0.13em] 2xl:text-[13px] ${
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
