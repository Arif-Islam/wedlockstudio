import Image from "next/image";
import { AboutAnimatedStat } from "@/components/AboutAnimatedStat";

export default function About() {
    return (
        <section
            id="about"
            className="relative py-16 md:py-24 overflow-hidden bg-[#f4f1eb]"
        >
            {/* Thin gold vertical accent line — desktop only */}
            <div className="absolute top-1/2 left-6 w-px h-40 bg-linear-to-b from-transparent via-black/20 to-transparent -translate-y-1/2 hidden xl:block pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Mobile/Tablet Title Area (Hidden on Desktop) */}
                <div className="block lg:hidden text-center mb-0">
                    <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3 mx-auto">
                        Our Story
                    </p>
                    <h2 className="text-2xl sm:text-4xl font-bold text-black leading-tight mx-auto max-w-2xl">
                        About <span className="text-gold">WedLockStudio</span>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Image Side */}
                    <div className="w-full lg:w-[46%] h-[400px] sm:h-[500px] lg:h-[650px] relative mt-4 lg:mt-0">
                        <div className="relative w-full h-full max-w-xl mx-auto lg:max-w-none group">
                            {/* Back Image */}
                            <div className="absolute top-[10%] left-[5%] w-[60%] h-[80%] rounded-md overflow-hidden shadow-[0_24px_70px_-42px_rgba(0,0,0,0.9)] border border-black/10 z-0 transform transition-transform duration-500 group-hover:-translate-y-4">
                                <Image
                                    src="https://res.cloudinary.com/djbh7xuqv/image/upload/v1772218144/modern-office-with-nobody-present_lxf4gu.jpg"
                                    alt="About WedLockStudio Back"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 50vw, 40vw"
                                    priority
                                />
                            </div>

                            {/* Front Image */}
                            <div className="absolute top-[20%] right-[5%] w-[48%] h-[60%] rounded-md overflow-hidden shadow-[0_24px_70px_-38px_rgba(0,0,0,0.95)] border border-black/15 z-10 transform transition-transform duration-500 group-hover:-translate-y-3">
                                <Image
                                    src="https://res.cloudinary.com/djbh7xuqv/image/upload/v1772218358/producer-songwriter-mixing-mastering-tracks-with-stereo-gear_ocuzit.jpg"
                                    alt="About WedLockStudio Front"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 50vw, 35vw"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-[54%] flex flex-col justify-center text-center lg:text-left">
                        {/* Desktop Title Area (Hidden on Mobile/Tablet) */}
                        <div className="hidden lg:block">
                            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                                Our Story
                            </p>
                            <h2 className="text-4xl xl:text-5xl font-bold text-black mb-6 leading-tight max-w-2xl">
                                About <span className="text-gold">WedLockStudio</span>
                            </h2>
                        </div>

                        <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-5 lg:hidden xl:block">
                            At WedLockStudio, we believe every frame tells a story. Established with a passion for visual storytelling, we specialize in high-end video editing services that bring your vision to life.
                        </p>
                        <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-5 hidden lg:block xl:hidden">
                            At WedLockStudio, we believe every frame tells a story. Established with a passion for visual storytelling, we specialize in high-end video editing services that bring your vision to life. We don&apos;t just edit videos — we craft emotional experiences.
                        </p>
                        <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-8 lg:hidden xl:block">
                            Whether it&apos;s a wedding film, corporate event, or a creative project, our team of expert editors ensures meticulous attention to detail, color grading, and sound design. We don&apos;t just edit videos — we craft emotional experiences.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            <AboutAnimatedStat
                                label="Projects Completed"
                                target={1000}
                                suffix="+"
                            />
                            <AboutAnimatedStat
                                label="Client Satisfaction"
                                target={100}
                                suffix="%"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
