import Image from "next/image";

export default function MeetOurTeam() {
    return (
        <section
            id="team"
            className="relative py-16 md:py-24 overflow-hidden bg-white"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-[#1c1c1c] rounded-sm sm:rounded-sm p-6 sm:p-12 lg:p-16 xl:p-10 shadow-2xl overflow-hidden relative">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-10 items-start lg:items-center relative z-10">

                        {/* Mobile/Tablet Title Area (Hidden on Desktop) */}
                        <div className="block lg:hidden text-center mb-6">
                            <p className="text-gold font-sans font-medium text-sm uppercase tracking-[0.2em] mb-4">
                                The Creators
                            </p>
                            <h2 className="text-4xl sm:text-5xl font-serif text-white leading-[1.1]">
                                Meet Our Team
                            </h2>
                        </div>

                        {/* Left Side - Image Composition */}
                        <div className="relative w-full max-w-lg mx-auto lg:max-w-none h-[220px] sm:h-[300px] lg:h-[380px] xl:h-[480px] flex lg:block items-center justify-between group mb-8 lg:mb-0">
                            {/* Decorative background glow for the images */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#d4af37]/10 rounded-full blur-[80px] pointer-events-none" />

                            {/* Back Image (Left side on mobile, Top-Left on Desktop) */}
                            <div className="relative lg:absolute lg:top-0 lg:left-0 w-[48%] lg:w-[50%] h-full lg:h-[75%] rounded-sm overflow-hidden shadow-2xl shadow-black/60 border border-white/5 z-0 transform transition-transform duration-700 lg:group-hover:-translate-y-2">
                                <Image
                                    src="https://res.cloudinary.com/djbh7xuqv/image/upload/v1772217391/group-graphic-designers-working-computer_iojoen.jpg"
                                    alt="Team Member 1"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 50vw, 30vw"
                                />
                            </div>

                            {/* Front Image (Right side on mobile, Bottom-Right on Desktop) */}
                            <div className="relative lg:absolute lg:bottom-0 lg:right-10 w-[48%] lg:w-[50%] h-full lg:h-[75%] rounded-sm overflow-hidden shadow-2xl shadow-black/80 border border-white/10 z-10 transform transition-transform duration-700 lg:group-hover:-translate-y-4">
                                <Image
                                    src="https://res.cloudinary.com/djbh7xuqv/image/upload/v1772217721/male-female-graphic-designers-interacting-with-each-other_eqt93k.jpg"
                                    alt="Team Member 2"
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 1024px) 50vw, 30vw"
                                />
                            </div>

                        </div>

                        {/* Right Side - Text Content */}
                        <div className="flex flex-col justify-center max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                            {/* Desktop Title Area (Hidden on Mobile/Tablet) */}
                            <div className="hidden lg:block">
                                <p className="text-gold font-sans font-medium text-sm uppercase tracking-[0.2em] mb-4">
                                    The Creators
                                </p>
                                <h2 className="text-4xl sm:text-5xl lg:text-5xl font-serif text-white mb-8 leading-[1.1]">
                                    Meet Our Team
                                </h2>
                            </div>

                            <div className="space-y-4 text-gray-400 text-base sm:text-lg leading-relaxed font-sans font-light">
                                <p>
                                    Every beautiful film is crafted by a dedicated team who understands the weight of your moments. We don’t just capture events — we anticipate, feel, and preserve them.
                                </p>
                                <p>
                                    With years of editorial and cinematic wedding experience, our approach blends documentary authenticity with a highly stylized luxury aesthetic. We are storytellers at heart, focused on capturing the sophisticated nuances of your day.
                                </p>
                                {/* <p>
                                    From the quiet anticipation before the ceremony to the joyful energy of the reception, we’re there — unobtrusive, attentive, and deeply passionate about our craft.
                                </p> */}
                            </div>

                            {/* <div className="mt-12 pt-10 border-t border-white/10">
                            <div className="flex flex-wrap items-center gap-8 md:gap-12 justify-center lg:justify-start">
                                <div>
                                    <h4 className="text-[#ebe3d5] font-serif text-xl mb-1">Ariful Islam</h4>
                                    <p className="text-[#8c8c8c] text-xs font-sans tracking-widest uppercase">Lead Cinematographer</p>
                                </div>
                                <div className="hidden sm:block w-px h-10 bg-white/10" />
                                <div>
                                    <h4 className="text-[#ebe3d5] font-serif text-xl mb-1">Jane Doe</h4>
                                    <p className="text-[#8c8c8c] text-xs font-sans tracking-widest uppercase">Creative Director</p>
                                </div>
                            </div>
                        </div> */}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
