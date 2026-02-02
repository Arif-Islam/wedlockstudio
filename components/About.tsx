import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image Side */}

                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056242/about-v2_jnjvv8.png"
                            alt="About WedLockStudio"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>

                    {/* Text Side */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                            About <span className="text-gold">WedLockStudio</span>
                        </h2>
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                            At WedLockStudio, we believe every frame tells a story. Established with a passion for visual storytelling, we specialize in high-end video editing services that bring your vision to life.
                        </p>
                        <p className="text-gray-700 text-lg mb-8 leading-relaxed md:hidden lg:block">
                            Whether it&apos;s a wedding film, corporate event, or a creative project, our team of expert editors ensures meticulous attention to detail, color grading, and sound design. We don&apos;t just edit videos; we craft emotional experiences.
                        </p>

                        {/* Stats - Desktop View (Inside right column) */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="border-l-4 border-gold pl-4">
                                <h3 className="text-2xl font-bold text-black">500+</h3>
                                <p className="text-gray-600">Projects Completed</p>
                            </div>
                            <div className="border-l-4 border-gold pl-4">
                                <h3 className="text-2xl font-bold text-black">100%</h3>
                                <p className="text-gray-600">Client Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats - Tablet/Mobile View (Bottom, centered, half width on tab) */}
                {/* <div className="lg:hidden grid grid-cols-2 gap-6 mt-12 w-full md:w-1/2 mx-auto">
                    <div className="border-l-4 border-gold pl-4">
                        <h3 className="text-2xl font-bold text-black">500+</h3>
                        <p className="text-gray-600">Projects Completed</p>
                    </div>
                    <div className="border-l-4 border-gold pl-4">
                        <h3 className="text-2xl font-bold text-black">100%</h3>
                        <p className="text-gray-600">Client Satisfaction</p>
                    </div>
                </div> */}
            </div>
        </section>
    );
}
