import Image from "next/image";

export default function About() {
    return (
        <section
            id="about"
            className="relative py-10 md:16 overflow-hidden bg-white"
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            {/* Thin gold vertical accent line — desktop only */}
            <div className="absolute top-1/2 left-6 w-px h-40 bg-linear-to-b from-transparent via-gold/20 to-transparent -translate-y-1/2 hidden xl:block pointer-events-none" />

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

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Image Side */}
                    <div className="w-full lg:w-[46%] h-[400px] sm:h-[500px] lg:h-[650px] relative mt-4 lg:mt-0">
                        <div className="relative w-full h-full max-w-xl mx-auto lg:max-w-none group">
                            {/* Gold glow behind images */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-gold/10 rounded-full blur-[80px] pointer-events-none" />

                            {/* Back Image */}
                            <div className="absolute top-[10%] left-[5%] w-[60%] h-[80%] rounded-sm overflow-hidden shadow-2xl shadow-black/20 border border-black/5 z-0 transform transition-transform duration-700 group-hover:-translate-y-2">
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
                            <div className="absolute top-[20%] right-[5%] w-[48%] h-[60%] rounded-sm overflow-hidden shadow-2xl shadow-black/30 border border-black/10 z-10 transform transition-transform duration-700 group-hover:-translate-y-4">
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
