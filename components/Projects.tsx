"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Play, X } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
    { id: 1, title: "Wedding Highlight", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056154/project1_nwnqtn.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058593/project1_s5r8hy.mp4" },
    { id: 2, title: "Corporate Event", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056150/project2_uyf5yl.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058560/project2_xeasmg.mp4" },
    { id: 3, title: "Music Video", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056157/project3_e3xx21.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058110/project3_i82o1q.mp4" },
    { id: 4, title: "Travel Log", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056160/project4_gucpbs.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058627/project4_jtvrj4.mp4" },
    { id: 5, title: "Documentary", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056175/project5_eq9xe3.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058517/project5_cfk73g.mp4" },
];

export default function Projects() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <section id="projects" className="py-20 bg-gray-50 text-black">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
                    Our <span className="text-gold">Masterpieces</span>
                </h2>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    autoplay={{ delay: 4000, disableOnInteraction: false }}

                    className="pb-12"
                    style={{
                        "--swiper-navigation-color": "#ffffff",
                    } as React.CSSProperties}
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div className="relative group overflow-hidden rounded-xl h-[300px] md:h-[500px] cursor-pointer bg-white border border-gray-200 shadow-md">
                                {/* Thumbnail */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                </div>

                                {/* Play Overlay */}
                                <div
                                    className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center"
                                    onClick={() => setSelectedVideo(project.video)}
                                >
                                    <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-gold/20">
                                        <Play fill="black" className="text-black ml-1" size={32} />
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
                    <button
                        className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <X size={40} />
                    </button>

                    <div className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-zinc-800">
                        <div className="w-full h-full flex items-center justify-center text-zinc-500">
                            {/* Use video tag here */}
                            <video
                                src={selectedVideo}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                                preload="metadata"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
