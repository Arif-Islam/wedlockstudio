"use client";

import Image from "next/image";

const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        review: "Absolutely stunning work! The color grading brought my wedding video to life in ways I never imagined. I was worried that we didn't have enough shots of just the bride and groom but you used the candid moments PERFECTLY and crafted a beautiful story.",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056566/client1_qr0ntg.jpg",
    },
    {
        id: 2,
        name: "Mark Thompson",
        review: "Professional, fast, and incredibly creative. They understood my brand identity from the very first draft. The turnaround times are incredibly fast, making them a reliable part of our project timelines. They have never missed a deadline.",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770057019/client2_mjfddl.jpg",
    },
    {
        id: 3,
        name: "Emily Chen",
        review: "The sound design was next level. I've never seen my travel vlogs look this cinematic and engaging. It's been difficult to find an editor that is willing to work with our style, but their edits felt like one of our own.",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056617/client3_rbbcgs.jpg",
    },
    {
        id: 4,
        name: "David Miller",
        review: "A true partner in production. They handled our tight deadlines with ease without compromising quality. This efficiency is invaluable and has made them an integral part of our workflow.",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056566/client1_qr0ntg.jpg",
    },
    {
        id: 5,
        name: "Jessica Alba",
        review: "Every frame was polished to perfection. Hands down the best editing team I've worked with so far. Changes are quick, the platform for comments is easy to use and very specific. Overall exceeded my expectations.",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770057019/client2_mjfddl.jpg",
    },
    {
        id: 6,
        name: "Julia Symphony",
        review: "I'm genuinely impressed by the attention to detail. The storytelling aspect of the edit was phenomenal, weaving together unrelated clips into a cohesive narrative that really resonated with our audience. Highly recommended!",
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056617/client3_rbbcgs.jpg",
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-20 bg-white text-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        What Our <span className="text-[#DBA73D]">Clients Say</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover how our expert editing services have elevated the work of wedding videographers, delighted event planners, and brought joy to engaged couples!
                    </p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="break-inside-avoid bg-gray-50 p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        sizes="40px"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-4 text-green-500"
                                        aria-label="Verified Client"
                                    >
                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 001.414 0l5.952-5.95-1.062-1.062-5.6 5.6z" />
                                    </svg>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                {testimonial.review}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
