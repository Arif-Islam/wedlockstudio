"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
// Center: 650x550, Thumbs: 280x280, Gap: 20px, Container height: 550
// Left video center X: calc(50% - 625px + 140px) = calc(50% - 485px)
// Right video center X: calc(50% + 345px + 140px) = calc(50% + 485px)
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

// For mobile infinite loop: create extended array [lastItem, ...allItems, firstItem]
const extendedProjects = [projects[projects.length - 1], ...projects, projects[0]];

export default function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slotOffset, setSlotOffset] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);

    // Mobile infinite loop state
    const [mobileSlideIndex, setMobileSlideIndex] = useState(1); // Start at 1 because index 0 is the clone of last
    const [mobileTransition, setMobileTransition] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Separate refs for mobile and desktop to avoid conflicts
    const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Get project index with wrapping (for desktop)
    const getProjectIndex = useCallback((offset: number) => {
        return (currentIndex + offset + projects.length * 10) % projects.length;
    }, [currentIndex]);

    // ==================== DESKTOP NAVIGATION ====================
    const goToNextDesktop = useCallback(() => {
        if (isAnimating) return;
        desktopVideoRefs.current.forEach((v) => v?.pause());
        setPlayingVideo(null);
        setIsAnimating(true);

        setTransitionEnabled(true);
        setSlotOffset(-1);

        setTimeout(() => {
            setTransitionEnabled(false);
            setCurrentIndex((prev) => (prev + 1) % projects.length);
            setSlotOffset(0);

            requestAnimationFrame(() => {
                setTransitionEnabled(true);
                setIsAnimating(false);
            });
        }, 700);
    }, [isAnimating]);

    const goToPrevDesktop = useCallback(() => {
        if (isAnimating) return;
        desktopVideoRefs.current.forEach((v) => v?.pause());
        setPlayingVideo(null);
        setIsAnimating(true);

        setTransitionEnabled(true);
        setSlotOffset(1);

        setTimeout(() => {
            setTransitionEnabled(false);
            setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
            setSlotOffset(0);

            requestAnimationFrame(() => {
                setTransitionEnabled(true);
                setIsAnimating(false);
            });
        }, 700);
    }, [isAnimating]);

    // ==================== MOBILE NAVIGATION (infinite loop) ====================
    const pauseAllMobileVideos = () => {
        mobileVideoRefs.current.forEach((v) => v?.pause());
        setPlayingVideo(null);
    };

    const mobileGoToNext = () => {
        pauseAllMobileVideos();
        setMobileTransition(true);
        setMobileSlideIndex((prev) => prev + 1);
    };

    const mobileGoToPrev = () => {
        pauseAllMobileVideos();
        setMobileTransition(true);
        setMobileSlideIndex((prev) => prev - 1);
    };

    const mobileGoToSlide = (realIndex: number) => {
        pauseAllMobileVideos();
        setMobileTransition(true);
        setMobileSlideIndex(realIndex + 1); // +1 because of the prepended clone
    };

    // Handle infinite loop snap-back after transition ends
    useEffect(() => {
        // If we've slid to the clone of the first item (at the end)
        if (mobileSlideIndex === extendedProjects.length - 1) {
            const timer = setTimeout(() => {
                setMobileTransition(false);
                setMobileSlideIndex(1); // Jump to real first item
            }, 700);
            return () => clearTimeout(timer);
        }
        // If we've slid to the clone of the last item (at the start)
        if (mobileSlideIndex === 0) {
            const timer = setTimeout(() => {
                setMobileTransition(false);
                setMobileSlideIndex(projects.length); // Jump to real last item
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [mobileSlideIndex]);

    // Get the real project index from mobile slide index
    const getMobileRealIndex = () => {
        if (mobileSlideIndex === 0) return projects.length - 1;
        if (mobileSlideIndex === extendedProjects.length - 1) return 0;
        return mobileSlideIndex - 1;
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
        if (distance > 50) mobileGoToNext();
        if (distance < -50) mobileGoToPrev();
        setTouchStart(0);
        setTouchEnd(0);
    };

    const toggleMobileVideo = (refIndex: number) => {
        const video = mobileVideoRefs.current[refIndex];
        if (video) {
            if (playingVideo === refIndex) {
                video.pause();
                setPlayingVideo(null);
            } else {
                video.play();
                setPlayingVideo(refIndex);
            }
        }
    };

    const toggleDesktopVideo = (projectIndex: number) => {
        const video = desktopVideoRefs.current[projectIndex];
        if (video) {
            if (playingVideo === projectIndex) {
                video.pause();
                setPlayingVideo(null);
            } else {
                video.play();
                setPlayingVideo(projectIndex);
            }
        }
    };

    const mobileRealIndex = getMobileRealIndex();

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

                {/* ==================== MOBILE/TABLET SLIDER (infinite loop) ==================== */}
                <div
                    className="lg:hidden relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="overflow-hidden">
                        <div
                            className="flex"
                            style={{
                                transform: `translateX(-${mobileSlideIndex * 100}%)`,
                                transition: mobileTransition ? "transform 0.7s ease-out" : "none",
                            }}
                        >
                            {extendedProjects.map((project, index) => {
                                const isPlaying = playingVideo === index;
                                return (
                                    <div key={`mobile-${index}`} className="min-w-full px-4">
                                        <div className="relative group overflow-hidden rounded-2xl h-[400px] md:h-[500px]">
                                            <video
                                                ref={(el) => { mobileVideoRefs.current[index] = el; }}
                                                src={project.video}
                                                className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                                                loop
                                                playsInline
                                                preload="metadata"
                                            />
                                            <div className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                                                <Image src={project.thumbnail} alt={project.title} fill sizes="100vw" className="object-cover" priority={index <= 2} />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                            </div>
                                            <div
                                                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                                                onClick={() => toggleMobileVideo(index)}
                                            >
                                                <div className={`w-20 h-20 bg-gold rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all shadow-2xl shadow-gold/30 ${!isPlaying ? "animate-pulse-subtle" : ""}`}>
                                                    {isPlaying ? <Pause fill="black" className="text-black" size={36} /> : <Play fill="black" className="text-black ml-1" size={36} />}
                                                </div>
                                            </div>
                                            <div className={`absolute bottom-2 left-0 right-0 p-6 z-10 transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                                                <div className="text-center space-y-2">
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
                                onClick={() => mobileGoToSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === mobileRealIndex ? "bg-gold w-3 h-3" : "bg-gray-400"}`}
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
                                className={`absolute rounded-2xl overflow-hidden group ${isCenter ? "z-20" : "z-10"}`}
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
                                        ref={(el) => { desktopVideoRefs.current[projectIndex] = el; }}
                                        src={project.video}
                                        className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                                        loop
                                        playsInline
                                        preload="metadata"
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
                                        onClick={() => toggleDesktopVideo(projectIndex)}
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
                                <div className={`absolute bottom-6 left-0 right-0 ${isCenter ? "p-6" : "p-4"} z-10 transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                                    {isCenter ? (
                                        <div className="text-center space-y-2">
                                            <h3 className="text-2xl md:text-2xl font-medium text-white">{project.subtitle}</h3>
                                            <p className="text-gray-300 text-sm">{project.title}</p>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Navigation Arrows - positioned at exact center of side videos */}
                    {/* Left arrow: center of left video = left edge (50% - 625px) + half width (140px) = calc(50% - 485px) */}
                    <button
                        onClick={goToPrevDesktop}
                        disabled={isAnimating}
                        className="absolute z-40 w-12 h-12 bg-white/90 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                        style={{
                            left: "calc(50% - 485px)",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                        aria-label="Previous"
                    >
                        <ChevronLeft size={24} className="text-black" />
                    </button>
                    {/* Right arrow: center of right video = left edge (50% + 345px) + half width (140px) = calc(50% + 485px) */}
                    <button
                        onClick={goToNextDesktop}
                        disabled={isAnimating}
                        className="absolute z-40 w-12 h-12 bg-white/90 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                        style={{
                            left: "calc(50% + 485px)",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                        aria-label="Next"
                    >
                        <ChevronRight size={24} className="text-black" />
                    </button>
                </div>
            </div>
        </section>
    );
}
