"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
    { id: 1, title: "Wedding Highlight", subtitle: "Katie & Sam", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056154/project1_nwnqtn.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058593/project1_s5r8hy.mp4" },
    { id: 2, title: "Corporate Event", subtitle: "Tech Summit 2024", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056150/project2_uyf5yl.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058560/project2_xeasmg.mp4" },
    { id: 3, title: "Music Video", subtitle: "Summer Nights", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056157/project3_e3xx21.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058110/project3_i82o1q.mp4" },
    { id: 4, title: "Travel Vlog", subtitle: "Asia Adventures", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056160/project4_gucpbs.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058627/project4_jtvrj4.mp4" },
    { id: 5, title: "Documentary", subtitle: "Behind The Lens", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056175/project5_eq9xe3.jpg", video: "https://res.cloudinary.com/djbh7xuqv/video/upload/q_auto,f_auto/v1770058517/project5_cfk73g.mp4" },
];

// Desktop carousel slot positions (absolute positioning)
// Center: 650x550, Thumbs: 280x280, Gap: 20px, Container height: 550
const SLOT_STYLES: Record<number, { left: string; top: number; width: number; height: number; opacity: number }> = {
    [-2]: { left: "calc(50% - 925px)", top: 135, width: 280, height: 280, opacity: 0 },
    [-1]: { left: "calc(50% - 625px)", top: 135, width: 280, height: 280, opacity: 0.75 },
    [0]: { left: "calc(50% - 325px)", top: 0, width: 650, height: 550, opacity: 1 },
    [1]: { left: "calc(50% + 345px)", top: 135, width: 280, height: 280, opacity: 0.75 },
    [2]: { left: "calc(50% + 645px)", top: 135, width: 280, height: 280, opacity: 0 },
};

function getSlotStyle(slot: number) {
    if (slot <= -2) return SLOT_STYLES[-2];
    if (slot >= 2) return SLOT_STYLES[2];
    return SLOT_STYLES[slot];
}

// For mobile infinite loop: create extended array [lastItem, ...allItems, firstItem]
const extendedProjects = [projects[projects.length - 1], ...projects, projects[0]];

const categories = ["Teaser", "Highlight Film", "Full Documentary Film", "Promotional Video"];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState("Teaser");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slotOffset, setSlotOffset] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);

    // Mobile infinite loop state
    const [mobileSlideIndex, setMobileSlideIndex] = useState(1);
    const [mobileTransition, setMobileTransition] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Animation state
    const [inView, setInView] = useState(false);
    const [tabAnimCount, setTabAnimCount] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const sliderWrapperRef = useRef<HTMLDivElement>(null);

    // Separate refs for mobile and desktop to avoid conflicts
    const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // ==================== VIEWPORT ENTRANCE (Intersection Observer) ====================
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect(); // Only animate once
                }
            },
            { threshold: 0.12 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    // Get project index with wrapping (for desktop)
    const getProjectIndex = useCallback((offset: number) => {
        return (currentIndex + offset + projects.length * 10) % projects.length;
    }, [currentIndex]);

    // ==================== TAB CHANGE ANIMATION ====================
    // Runs AFTER React's render cycle so the DOM manipulation won't be overwritten
    useEffect(() => {
        if (tabAnimCount === 0) return; // Skip the initial render
        const el = sliderWrapperRef.current;
        if (!el) return;

        // Clear any previous animation so the browser treats the next set as new
        el.style.animation = "none";

        // rAF ensures the browser has flushed the "none" before we apply the new animation
        requestAnimationFrame(() => {
            el.style.animation =
                "tab-content-refresh 0.8s cubic-bezier(0.16, 1, 0.3, 1) both";
        });
    }, [tabAnimCount]);

    const handleCategoryChange = (category: string) => {
        if (category === activeCategory) return;
        setActiveCategory(category);
        setTabAnimCount((prev) => prev + 1); // Triggers the useEffect above after render
    };

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
        setMobileSlideIndex(realIndex + 1);
    };

    // Handle infinite loop snap-back after transition ends
    useEffect(() => {
        if (mobileSlideIndex === extendedProjects.length - 1) {
            const timer = setTimeout(() => {
                setMobileTransition(false);
                setMobileSlideIndex(1);
            }, 700);
            return () => clearTimeout(timer);
        }
        if (mobileSlideIndex === 0) {
            const timer = setTimeout(() => {
                setMobileTransition(false);
                setMobileSlideIndex(projects.length);
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [mobileSlideIndex]);

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
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-20 md:py-28 overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #f9f8f5 0%, #f5f3ef 30%, #f7f5f1 60%, #fdfbf7 100%)",
            }}
        >
            {/* ── Decorative background orbs ── */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/4 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/4 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-72 h-72 bg-gold/3 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* ── Thin gold vertical accent lines — desktop only ── */}
            <div className="absolute top-1/2 left-6 w-px h-40 bg-linear-to-b from-transparent via-gold/15 to-transparent -translate-y-1/2 hidden xl:block pointer-events-none" />
            <div className="absolute top-1/2 right-6 w-px h-40 bg-linear-to-b from-transparent via-gold/15 to-transparent -translate-y-1/2 hidden xl:block pointer-events-none" />

            {/* ── Subtle horizontal divider at the very top ── */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Section Header ── */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-12 lg:mb-20 gap-6">
                    {/* Title block — viewport entrance stagger group 1 */}
                    <div
                        className={cn(
                            "text-center lg:text-left w-full lg:w-auto",
                            inView ? "animate-slide-up-fade" : "opacity-0"
                        )}
                    >
                        <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                            Our Work
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 leading-tight">
                            Project <span className="text-gold">Highlights</span>
                        </h2>
                        <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Explore our curated collection of cinematic {activeCategory.toLowerCase()}s
                        </p>
                    </div>

                    {/* Category Tabs — viewport entrance stagger group 2 */}
                    <div
                        className={cn(
                            "w-full md:w-[90%] lg:w-auto",
                            inView ? "animate-slide-up-fade" : "opacity-0"
                        )}
                        style={inView ? { animationDelay: "0.15s" } : undefined}
                    >
                        {/* Mobile Grid Layout */}
                        <div className="grid grid-cols-2 gap-3 md:hidden">
                            {categories.map((category) => (
                                <button
                                    key={`mobile-${category}`}
                                    onClick={() => handleCategoryChange(category)}
                                    className={cn(
                                        "px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer border",
                                        activeCategory === category
                                            ? "bg-gold text-black shadow-lg shadow-gold/20 scale-[1.02] border-gold"
                                            : "bg-white/80 backdrop-blur-sm text-gray-500 hover:text-black hover:bg-white border-gold/10"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Desktop Pill Layout */}
                        <div className="hidden md:inline-flex bg-white/70 backdrop-blur-md rounded-full p-1.5 border border-gold/15 shadow-sm shrink-0 whitespace-nowrap">
                            {categories.map((category) => (
                                <button
                                    key={`desktop-${category}`}
                                    onClick={() => handleCategoryChange(category)}
                                    className={cn(
                                        "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer",
                                        activeCategory === category
                                            ? "bg-gold text-black shadow-lg shadow-gold/20 scale-105"
                                            : "text-gray-500 hover:text-black hover:bg-white/60"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Viewport entrance wrapper (stagger group 3) ── */}
                <div
                    className={cn(inView ? "animate-slide-up-fade" : "opacity-0")}
                    style={inView ? { animationDelay: "0.3s" } : undefined}
                >
                {/* ── Tab-change animation wrapper (separate from viewport to avoid conflicts) ── */}
                <div ref={sliderWrapperRef}>
                    {/* ==================== MOBILE/TABLET SLIDER (infinite loop) ==================== */}
                    <div
                        className="lg:hidden relative"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="overflow-hidden rounded-2xl">
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
                                        <div key={`mobile-${index}`} className="min-w-full px-2">
                                            <div className="relative group overflow-hidden rounded-2xl h-[400px] md:h-[500px] shadow-xl ring-1 ring-black/5">
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

                        {/* Dot indicators */}
                        <div className="flex justify-center gap-2.5 mt-8">
                            {projects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => mobileGoToSlide(index)}
                                    className={cn(
                                        "rounded-full transition-all duration-300 cursor-pointer",
                                        index === mobileRealIndex
                                            ? "bg-gold w-7 h-2.5"
                                            : "bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5"
                                    )}
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
                                    className={cn(
                                        "absolute rounded-2xl overflow-hidden group",
                                        isCenter ? "z-20 shadow-2xl ring-1 ring-black/10" : "z-10 shadow-lg ring-1 ring-black/5"
                                    )}
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
                                            className={`object-cover ${isCenter ? "group-hover:scale-105 transition-transform duration-700" : ""}`}
                                            priority={offset === 0}
                                        />
                                        <div className={cn(
                                            "absolute inset-0",
                                            isCenter
                                                ? "bg-linear-to-t from-black/70 via-black/10 to-transparent"
                                                : "bg-black/20"
                                        )} />
                                    </div>

                                    {/* Play Button - only on center */}
                                    {isCenter && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                                            onClick={() => toggleDesktopVideo(projectIndex)}
                                        >
                                            <div className={cn(
                                                "w-20 h-20 bg-gold rounded-full flex items-center justify-center transform transition-all shadow-2xl shadow-gold/30",
                                                "group-hover:scale-110",
                                                !isPlaying && "animate-pulse-subtle"
                                            )}>
                                                {isPlaying ? (
                                                    <Pause fill="black" className="text-black" size={36} />
                                                ) : (
                                                    <Play fill="black" className="text-black ml-1" size={36} />
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Title overlay — center only */}
                                    {isCenter && (
                                        <div className={`absolute bottom-0 left-0 right-0 p-6 z-10 transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                                            <div className="text-center space-y-1.5">
                                                <h3 className="text-2xl font-semibold text-white drop-shadow-md">{project.subtitle}</h3>
                                                <p className="text-gray-300 text-sm tracking-wide">{project.title}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Navigation Arrows — positioned at exact center of side videos */}
                        <button
                            onClick={goToPrevDesktop}
                            disabled={isAnimating}
                            className="absolute z-40 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ring-1 ring-black/5 hover:ring-gold/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                left: "calc(50% - 485px)",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} className="text-black" />
                        </button>
                        <button
                            onClick={goToNextDesktop}
                            disabled={isAnimating}
                            className="absolute z-40 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ring-1 ring-black/5 hover:ring-gold/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                </div>
            </div>

            {/* ── Subtle horizontal divider at the very bottom ── */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent pointer-events-none" />
        </section>
    );
}
