"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        review: "Absolutely stunning work! The color grading brought my wedding video to life in ways I never imagined.",
        rating: 5,
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056566/client1_qr0ntg.jpg",
    },
    {
        id: 2,
        name: "Mark Thompson",
        review: "Professional, fast, and incredibly creative. They understood my brand identity from the very first draft.",
        rating: 5,
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770057019/client2_mjfddl.jpg",
    },
    {
        id: 3,
        name: "Emily Chen",
        review: "The sound design was next level. I've never seen my travel vlogs look this cinematic and engaging.",
        rating: 5,
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056617/client3_rbbcgs.jpg",
    },
    {
        id: 4,
        name: "David Miller",
        review: "A true partner in production. They handled our tight deadlines with ease without compromising quality.",
        rating: 5,
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056566/client1_qr0ntg.jpg",
    },
    {
        id: 5,
        name: "Jessica Alba",
        review: "Every frame was polished to perfection. Hands down the best editing team I've worked with so far.",
        rating: 5,
        image: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770057019/client2_mjfddl.jpg",
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-20 bg-gray-50 text-black">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
                    What Our <span className="text-gold">Clients Say</span>
                </h2>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-24"
                    style={{
                        "--swiper-pagination-color": "#DBA73D",
                        "--swiper-pagination-bullet-inactive-color": "#9CA3AF",
                        "--swiper-pagination-bullet-inactive-opacity": "1",
                        "--swiper-pagination-bullet-size": "11px",
                        "--swiper-pagination-bullet-horizontal-gap": "6px",
                        "--swiper-pagination-bottom": "5px",
                    } as React.CSSProperties}
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-gold/50 transition-colors h-full flex flex-col shadow-sm">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-gold text-gold" />
                                    ))}
                                </div>

                                <p className="text-gray-600 italic mb-6 flex-1">&quot;{testimonial.review}&quot;</p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden relative">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            sizes="48px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black">{testimonial.name}</h4>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
