import Image from "next/image";

export default function About() {
    return (
        <section
            id="about"
            className="relative py-20 md:py-28 overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #fdfbf7 0%, #faf9f6 50%, #ffffff 100%)",
            }}
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            {/* Thin gold vertical accent line — desktop only */}
            <div className="absolute top-1/2 left-6 w-px h-40 bg-linear-to-b from-transparent via-gold/20 to-transparent -translate-y-1/2 hidden xl:block pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Image Side */}
                    <div className="w-full lg:w-[46%]">
                        <div className="relative max-w-md mx-auto lg:max-w-none">
                            {/* Gold glow behind image */}
                            <div className="absolute -inset-2 rounded-2xl bg-gold/10 blur-md pointer-events-none" />
                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
                                <Image
                                    src="https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056242/about-v2_jnjvv8.png"
                                    alt="WedLockStudio — professional video editing"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 46vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-[54%] flex flex-col justify-center">
                        <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                            Our Story
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-black mb-6 leading-tight">
                            About <span className="text-gold">WedLockStudio</span>
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-5 lg:hidden xl:block">
                            At WedLockStudio, we believe every frame tells a story. Established with a passion for visual storytelling, we specialize in high-end video editing services that bring your vision to life.
                        </p>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-5 hidden lg:block xl:hidden">
                            At WedLockStudio, we believe every frame tells a story. Established with a passion for visual storytelling, we specialize in high-end video editing services that bring your vision to life. We don&apos;t just edit videos — we craft emotional experiences.
                        </p>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 lg:hidden xl:block">
                            Whether it&apos;s a wedding film, corporate event, or a creative project, our team of expert editors ensures meticulous attention to detail, color grading, and sound design. We don&apos;t just edit videos — we craft emotional experiences.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            <div className="rounded-xl bg-white/80 backdrop-blur-sm border border-gold/10 px-5 py-4 shadow-sm">
                                <h3 className="text-2xl sm:text-3xl font-bold text-black">500+</h3>
                                <p className="text-gray-500 text-sm sm:text-base">Projects Completed</p>
                            </div>
                            <div className="rounded-xl bg-white/80 backdrop-blur-sm border border-gold/10 px-5 py-4 shadow-sm">
                                <h3 className="text-2xl sm:text-3xl font-bold text-black">100%</h3>
                                <p className="text-gray-500 text-sm sm:text-base">Client Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
