"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
    { id: 1, title: "Wedding Highlight", subtitle: "Katie & Sam", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056154/project1_nwnqtn.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058593/project1_s5r8hy.mp4" },
    { id: 2, title: "Corporate Event", subtitle: "Tech Summit 2024", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056150/project2_uyf5yl.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058560/project2_xeasmg.mp4" },
    { id: 3, title: "Music Video", subtitle: "Summer Nights", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056157/project3_e3xx21.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058110/project3_i82o1q.mp4" },
    { id: 4, title: "Travel Vlog", subtitle: "Asia Adventures", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056160/project4_gucpbs.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058627/project4_jtvrj4.mp4" },
    { id: 5, title: "Documentary", subtitle: "Behind The Lens", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056175/project5_eq9xe3.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058517/project5_cfk73g.mp4" },
];

// Desktop carousel slot positions (absolute positioning)
// Container is relative, positions calculated from center
// Layout: [off-screen-left] [left-thumb] [CENTER] [right-thumb] [off-screen-right]
// Center: 650x550, Thumbs: 280x280, Gap: 20px
const SLOT_STYLES: Record<number, { left: string; top: number; width: number; height: number; opacity: number }> = {
    [-2]: { left: "calc(50% - 925px)", top: 135, width: 280, height: 280, opacity: 0 },
    [-1]: { left: "calc(50% - 625px)", top: 135, width: 280, height: 280, opacity: 0.75 },
    [0]:  { left: "calc(50% - 325px)", top: 0,   width: 650, height: 550, opacity: 1 },
    [1]:  { left: "calc(50% + 345px)", top: 135, width: 280, height: 280, opacity: 0.75 },
    [2]:  { left: "calc(50% + 645px)", top: 135, width: 280, height: 280, opacity: 0 },
};

function getSlotStyle(slot: number) {
    if (slot <= -2) return SLOT_STYLES[-2];
    if (slot >= 2) return SLOT_STYLES[2];
    return SLOT_STYLES[slot];
}

export default function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slotOffset, setSlotOffset] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Get project index with wrapping
    const getProjectIndex = useCallback((offset: number) => {
        return (currentIndex + offset + projects.length * 10) % projects.length;
    }, [currentIndex]);

    // Desktop navigation with animation
    const goToNextDesktop = useCallback(() => {
        if (isAnimating) return;
        videoRefs.current.forEach((v) => v?.pause());
        setPlayingVideo(null);
        setIsAnimating(true);

        // Step 1: Enable transitions and shift slots left
        setTransitionEnabled(true);
        setSlotOffset(-1);

        // Step 2: After animation, update state instantly
        setTimeout(() => {
            setTransitionEnabled(false); // Disable transitions for instant reset
            setCurrentIndex((prev) => (prev + 1) % projects.length);
            setSlotOffset(0); // Reset slots

            // Step 3: Re-enable transitions on next frame
            requestAnimationFrame(() => {
                setTransitionEnabled(true);
                setIsAnimating(false);
            });
        }, 700);
    }, [isAnimating]);

    const goToPrevDesktop = useCallback(() => {
        if (isAnimating) return;
        videoRefs.current.forEach((v) => v?.pause());
        setPlayingVideo(null);
        setIsAnimating(true);

        // Step 1: Enable transitions and shift slots right
        setTransitionEnabled(true);
        setSlotOffset(1);

        // Step 2: After animation, update state instantly
        setTimeout(() => {
            setTransitionEnabled(false); // Disable transitions for instant reset
            setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
            setSlotOffset(0); // Reset slots

            // Step 3: Re-enable transitions on next frame
            requestAnimationFrame(() => {
                setTransitionEnabled(true);
                setIsAnimating(false);
            });
        }, 700);
    }, [isAnimating]);

    // Mobile navigation (instant, no carousel animation needed)
    const goToNext = () => {
        videoRefs.current.forEach((video) => video?.pause());
        setPlayingVideo(null);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const goToPrev = () => {
        videoRefs.current.forEach((video) => video?.pause());
        setPlayingVideo(null);
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const goToSlide = (index: number) => {
        videoRefs.current.forEach((video) => video?.pause());
        setPlayingVideo(null);
        setCurrentIndex(index);
    };

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > 50) goToNext();
        if (distance < -50) goToPrev();
        setTouchStart(0);
        setTouchEnd(0);
    };

    const toggleVideo = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            if (playingVideo === index) {
                video.pause();
                setPlayingVideo(null);
            } else {
                video.play();
                setPlayingVideo(index);
            }
        }
    };

    return (
        <section id="projects" className="py-20 bg-gray-50 text-black relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
                    Wedding Highlight <span className="text-gold">Examples</span>
                </h2>
                <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                    Explore our curated collection of cinematic wedding highlights
                </p>

                {/* ==================== MOBILE/TABLET SLIDER ==================== */}
                <div
                    className="lg:hidden relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {projects.map((project, index) => {
                                const isPlaying = playingVideo === index;
                                return (
                                    <div key={project.id} className="min-w-full px-4">
                                        <div className="relative group overflow-hidden rounded-2xl h-[400px] md:h-[500px] shadow-2xl">
                                            <video
                                                ref={(el) => { videoRefs.current[index] = el; }}
                                                src={project.video}
                                                className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                                                loop playsInline preload="metadata"
                                            />
                                            <div className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                                                <Image src={project.thumbnail} alt={project.title} fill sizes="100vw" className="object-cover" priority={index === 0} />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer" onClick={() => toggleVideo(index)}>
                                                <div className={`w-20 h-20 bg-gold rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all shadow-2xl shadow-gold/30 ${!isPlaying ? "animate-pulse-subtle" : ""}`}>
                                                    {isPlaying ? <Pause fill="black" className="text-black" size={36} /> : <Play fill="black" className="text-black ml-1" size={36} />}
                                                </div>
                                            </div>
                                            <div className={`absolute bottom-0 left-0 right-0 p-6 z-10 transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                                                <div className="text-center space-y-2">
                                                    <p className="text-gold text-sm font-semibold uppercase tracking-wider">Highlight</p>
                                                    <h3 className="text-2xl md:text-3xl font-bold text-white">{project.subtitle}</h3>
                                                    <p className="text-gray-300 text-sm">{project.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex justify-center gap-2 mt-8">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-gold w-3 h-3" : "bg-gray-400"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* ==================== DESKTOP CAROUSEL ==================== */}
                <div className="hidden lg:block relative overflow-hidden" style={{ height: 550 }}>
                    {/* 5 absolutely positioned slides */}
                    {[-2, -1, 0, 1, 2].map((offset) => {
                        const projectIndex = getProjectIndex(offset);
                        const project = projects[projectIndex];
                        const slot = offset + slotOffset;
                        const style = getSlotStyle(slot);
                        const isCenter = slot === 0;
                        const isPlaying = playingVideo === projectIndex && isCenter;

                        return (
                            <div
                                key={`desktop-${offset}`}
                                className={`absolute rounded-2xl overflow-hidden group ${isCenter ? "shadow-2xl z-20" : "shadow-lg z-10"}`}
                                style={{
                                    left: style.left,
                                    top: style.top,
                                    width: style.width,
                                    height: style.height,
                                    opacity: style.opacity,
                                    transition: transitionEnabled
                                        ? "left 0.7s cubic-bezier(0.4, 0, 0.2, 1), top 0.7s cubic-bezier(0.4, 0, 0.2, 1), width 0.7s cubic-bezier(0.4, 0, 0.2, 1), height 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
                                        : "none",
                                }}
                            >
                                {/* Video - only rendered for current center */}
                                {offset === 0 && (
                                    <video
                                        ref={(el) => { videoRefs.current[projectIndex] = el; }}
                                        src={project.video}
                                        className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                                        loop playsInline preload="metadata"
                                    />
                                )}

                                {/* Thumbnail */}
                                <div className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        sizes={isCenter ? "650px" : "280px"}
                                        className={`object-cover ${isCenter ? "group-hover:scale-110 transition-transform duration-700" : ""}`}
                                        priority={offset === 0}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                </div>

                                {/* Play Button - only on center */}
                                {isCenter && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                                        onClick={() => toggleVideo(projectIndex)}
                                    >
                                        <div className={`w-20 h-20 bg-gold rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all shadow-2xl shadow-gold/30 ${!isPlaying ? "animate-pulse-subtle" : ""}`}>
                                            {isPlaying ? (
                                                <Pause fill="black" className="text-black" size={36} />
                                            ) : (
                                                <Play fill="black" className="text-black ml-1" size={36} />
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Title */}
                                <div className={`absolute bottom-0 left-0 right-0 ${isCenter ? "p-6" : "p-4"} z-10 transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                                    {isCenter ? (
                                        <div className="text-center space-y-2">
                                            <p className="text-gold text-sm font-semibold uppercase tracking-wider">Highlight</p>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white">{project.subtitle}</h3>
                                            <p className="text-gray-300 text-sm">{project.title}</p>
                                        </div>
                                    ) : (
                                        <h3 className="text-lg font-bold text-white text-center">{project.title}</h3>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevDesktop}
                        disabled={isAnimating}
                        className="absolute left-[10%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/90 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={24} className="text-black" />
                    </button>
                    <button
                        onClick={goToNextDesktop}
                        disabled={isAnimating}
                        className="absolute right-[10%] top-1/2 translate-x-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/90 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next"
                    >
                        <ChevronRight size={24} className="text-black" />
                    </button>
                </div>
            </div>
        </section>
    );
}
