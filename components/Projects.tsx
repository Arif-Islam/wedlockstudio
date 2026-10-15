"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

type ProjectItem = { id: number; title: string; subtitle: string; thumbnail: string; vimeoId: string };

const highlightFilmProjects: ProjectItem[] = [
    { id: 1, title: "Wedding Highlight", subtitle: "Katie & Sam", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto,w_1400/v1772132621/thumbnail_1_u0ept3.png", vimeoId: "1162155196" },
    { id: 2, title: "Studio Delivery", subtitle: "Reception Cut", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto,w_1400/v1772131695/thumbnail_2_zibdlu.png", vimeoId: "923101806" },
    { id: 3, title: "Ceremony Film", subtitle: "Vows & Details", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto,w_1400/v1772132467/thumbnail_3_eclktu.png", vimeoId: "920569834" },
    { id: 4, title: "Destination Story", subtitle: "Editorial Recap", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto,w_1400/v1772132424/thumbnail_4_fnrweu.png", vimeoId: "805961590" },
    { id: 5, title: "Documentary Edit", subtitle: "Full-Day Film", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto,w_1400/v1772132193/thumbnail_5_zw4aea.png", vimeoId: "814933799" },
];

const teaserProjectsRaw: ProjectItem[] = [
    { id: 1, title: "Wedding Teaser", subtitle: "Opening Moments", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto,w_1400/v1772134709/teaser_1_rzx1h2.png", vimeoId: "857784436" },
    { id: 2, title: "Wedding Teaser", subtitle: "Golden Hour", thumbnail: "https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto,w_1400/v1772134779/teaser_2_sqy9xv.png", vimeoId: "858749361" },
];
const teaserProjectsExpanded: ProjectItem[] = [
    { ...teaserProjectsRaw[0], id: 1, subtitle: "Teaser 1" },
    { ...teaserProjectsRaw[1], id: 2, subtitle: "Teaser 2" },
    { ...teaserProjectsRaw[0], id: 3, subtitle: "Teaser 3" },
    { ...teaserProjectsRaw[1], id: 4, subtitle: "Teaser 4" },
    { ...teaserProjectsRaw[0], id: 5, subtitle: "Teaser 5" },
];

function getProjectsForCategory(category: string): ProjectItem[] {
    if (category === "Teaser") return teaserProjectsExpanded;
    return highlightFilmProjects;
}

const CENTER_W = 800;
const CENTER_H = 450;
const SIDE_W = 300;
const SIDE_H = 270;
const GAP = 18;

type CarouselDims = { centerW: number; centerH: number; sideW: number; sideH: number; gap: number };

function getSlotStyle(slot: number, d: CarouselDims) {
    const half = d.centerW / 2;
    const sideTop = (d.centerH - d.sideH) / 2;
    const styles: Record<number, { left: string; top: number; width: number; height: number; opacity: number }> = {
        [-2]: { left: `calc(50% - ${half + d.gap + d.sideW * 2}px)`, top: sideTop, width: d.sideW, height: d.sideH, opacity: 0 },
        [-1]: { left: `calc(50% - ${half + d.gap + d.sideW}px)`, top: sideTop, width: d.sideW, height: d.sideH, opacity: 0.75 },
        [0]: { left: `calc(50% - ${half}px)`, top: 0, width: d.centerW, height: d.centerH, opacity: 1 },
        [1]: { left: `calc(50% + ${half + d.gap}px)`, top: sideTop, width: d.sideW, height: d.sideH, opacity: 0.75 },
        [2]: { left: `calc(50% + ${half + d.gap + d.sideW}px)`, top: sideTop, width: d.sideW, height: d.sideH, opacity: 0 },
    };
    if (slot <= -2) return styles[-2];
    if (slot >= 2) return styles[2];
    return styles[slot];
}

const categories = ["Highlight Film", "Teaser", "Full Documentary Film", "Promotional Video"];
const categoryDescriptionKeys: Record<string, string> = {
    "Highlight Film": "Explore our curated collection of cinematic highlight films.",
    Teaser: "Explore our curated collection of cinematic wedding teasers.",
    "Full Documentary Film": "Explore our curated collection of cinematic documentary films.",
    "Promotional Video": "Explore our curated collection of cinematic promotional videos.",
};
const VIMEO_PLAYER_PARAMS = "autoplay=1&muted=0&autopause=1&playsinline=1&dnt=1&title=0&byline=0&portrait=0";

function getVideoKey(surface: "mobile" | "desktop", category: string, slotId: number, project: ProjectItem) {
    return `${surface}-${category}-${slotId}-${project.vimeoId}`;
}

function VimeoPlayer({
    project,
    playerKey,
    isLoading,
    isSlow,
    onLoaded,
}: {
    project: ProjectItem;
    playerKey: string;
    isLoading: boolean;
    isSlow: boolean;
    onLoaded: () => void;
}) {
    const { t } = useLanguage();
    return (
        <>
            <iframe
                key={playerKey}
                src={`https://player.vimeo.com/video/${project.vimeoId}?${VIMEO_PLAYER_PARAMS}`}
                className="absolute inset-0 z-30 h-full w-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
                title={`${t(project.subtitle)} - ${t(project.title)}`}
                onLoad={onLoaded}
            />
            {isLoading && (
                <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-black/65 text-center text-white backdrop-blur-[2px]">
                    <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/25 border-t-gold" />
                    <p className="text-sm font-semibold tracking-wide">
                        {t(isSlow ? "Still loading video..." : "Loading video...")}
                    </p>
                </div>
            )}
        </>
    );
}

export default function Projects() {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState("Highlight Film");
    const projects = getProjectsForCategory(activeCategory);
    const extendedProjects = [projects[projects.length - 1], ...projects, projects[0]];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slotOffset, setSlotOffset] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [playingVideoKey, setPlayingVideoKey] = useState<string | null>(null);
    const [loadingVideoKey, setLoadingVideoKey] = useState<string | null>(null);
    const [slowVideoKey, setSlowVideoKey] = useState<string | null>(null);

    // Mobile infinite loop state
    const [mobileSlideIndex, setMobileSlideIndex] = useState(1);
    const [mobileTransition, setMobileTransition] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Animation state
    const [inView, setInView] = useState(false);
    const [tabAnimCount, setTabAnimCount] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const tabContentRef = useRef<HTMLDivElement>(null);
    const desktopCarouselRef = useRef<HTMLDivElement>(null);

    // Responsive carousel dimensions: fill the carousel row on lg+ screens
    const [carouselDims, setCarouselDims] = useState<CarouselDims>({
        centerW: CENTER_W,
        centerH: CENTER_H,
        sideW: SIDE_W,
        sideH: SIDE_H,
        gap: GAP,
    });

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

    // ==================== DESKTOP CAROUSEL: fill available width from lg screens up ====================
    useEffect(() => {
        const el = desktopCarouselRef.current;
        if (!el) return;
        const ro = new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            if (width < 100) return; // avoid zero dims when carousel is hidden (< 1024px)
            const gap = width >= 1500 ? 24 : 18;
            const centerW = Math.round(Math.min(940, Math.max(560, width * 0.52)));
            const centerH = Math.round(centerW * 0.5625);
            const sideW = Math.max(200, Math.round((width - centerW - gap * 2) / 2));
            const sideH = Math.round(Math.min(centerH * 0.82, sideW * 0.72));
            setCarouselDims({
                centerW,
                centerH,
                sideW,
                sideH,
                gap,
            });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const stopActiveVideo = () => {
        setPlayingVideoKey(null);
        setLoadingVideoKey(null);
        setSlowVideoKey(null);
    };

    const toggleVideo = (playerKey: string) => {
        if (playingVideoKey === playerKey) {
            stopActiveVideo();
            return;
        }

        setPlayingVideoKey(playerKey);
        setLoadingVideoKey(playerKey);
        setSlowVideoKey(null);
    };

    const clearLoadingForKey = (playerKey: string) => {
        setLoadingVideoKey((current) => (current === playerKey ? null : current));
        setSlowVideoKey((current) => (current === playerKey ? null : current));
    };

    useEffect(() => {
        if (!loadingVideoKey) return;

        const timer = window.setTimeout(() => {
            setSlowVideoKey((current) => current ?? loadingVideoKey);
        }, 4500);

        return () => window.clearTimeout(timer);
    }, [loadingVideoKey]);

    // Get project index with wrapping (for desktop)
    const getProjectIndex = (offset: number) => {
        return (currentIndex + offset + projects.length * 10) % projects.length;
    };

    // ==================== TAB CHANGE ANIMATION ====================
    useEffect(() => {
        if (tabAnimCount === 0) return;
        const el = tabContentRef.current;
        if (!el) return;

        if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        el.style.animation = "none";
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const node = tabContentRef.current;
                if (node) {
                    node.style.animation =
                        "tab-content-refresh 2s cubic-bezier(0.22, 1, 0.36, 1) both";
                }
            });
        });
    }, [tabAnimCount]);

    const handleCategoryChange = (category: string) => {
        if (category === activeCategory) return;
        stopActiveVideo();
        setIsAnimating(false);
        setTransitionEnabled(false);
        setSlotOffset(0);
        setCurrentIndex(0);
        setMobileTransition(false);
        setMobileSlideIndex(1);
        setTouchStart(0);
        setTouchEnd(0);
        setActiveCategory(category);
        setTabAnimCount((prev) => prev + 1);

        requestAnimationFrame(() => {
            setTransitionEnabled(true);
            setMobileTransition(true);
        });
    };

    // ==================== DESKTOP NAVIGATION ====================
    const goToNextDesktop = () => {
        if (isAnimating) return;
        stopActiveVideo();
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
    };

    const goToPrevDesktop = () => {
        if (isAnimating) return;
        stopActiveVideo();
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
    };

    // ==================== MOBILE NAVIGATION (infinite loop) ====================
    const pauseAllMobileVideos = () => {
        stopActiveVideo();
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
    }, [extendedProjects.length, mobileSlideIndex, projects.length]);

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

    const mobileRealIndex = getMobileRealIndex();

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-20 md:py-28 overflow-hidden bg-[#12110f] text-white"
        >
            {/* ── Thin gold vertical accent lines — desktop only ── */}
            <div className="absolute top-1/2 left-6 w-px h-40 bg-linear-to-b from-transparent via-white/20 to-transparent -translate-y-1/2 hidden lg:block pointer-events-none" />
            <div className="absolute top-1/2 right-6 w-px h-40 bg-linear-to-b from-transparent via-white/20 to-transparent -translate-y-1/2 hidden lg:block pointer-events-none" />

            {/* ── Subtle horizontal divider at the very top ── */}
            <div className="absolute top-0 left-0 right-0 h-px bg-white/10 pointer-events-none" />

            <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
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
                            {t("Our Work")}
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                            {t("Project")} <span className="text-gold">{t("Highlights")}</span>
                        </h2>
                        <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            {t(categoryDescriptionKeys[activeCategory])}
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
                                        "px-4 py-3 rounded-md text-sm font-semibold transition-all duration-300 cursor-pointer border",
                                        activeCategory === category
                                            ? "bg-gold text-black border-gold"
                                            : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border-white/10"
                                    )}
                                >
                                    {t(category)}
                                </button>
                            ))}
                        </div>

                        {/* Desktop Pill Layout */}
                        <div className="hidden md:inline-flex bg-white/5 rounded-md p-1.5 border border-white/10 shrink-0 whitespace-nowrap">
                            {categories.map((category) => (
                                <button
                                    key={`desktop-${category}`}
                                    onClick={() => handleCategoryChange(category)}
                                    className={cn(
                                        "px-6 py-2.5 rounded-sm text-sm font-semibold transition-all duration-300 cursor-pointer",
                                        activeCategory === category
                                            ? "bg-gold text-black"
                                            : "text-neutral-400 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    {t(category)}
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
                    <div ref={tabContentRef}>
                    {/* ==================== MOBILE/TABLET SLIDER (infinite loop) — until < 1024px ==================== */}
                        <div
                            className="relative lg:hidden"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="overflow-hidden rounded-lg border border-white/10 bg-black shadow-[0_28px_80px_-46px_rgba(0,0,0,1)]">
                                <div
                                    className="flex"
                                    style={{
                                        transform: `translateX(-${mobileSlideIndex * 100}%)`,
                                        transition: mobileTransition ? "transform 0.7s ease-out" : "none",
                                    }}
                                >
                                    {extendedProjects.map((project, index) => {
                                        const playerKey = getVideoKey("mobile", activeCategory, index, project);
                                        const isPlaying = playingVideoKey === playerKey;
                                        const isLoading = loadingVideoKey === playerKey;
                                        return (
                                            <div key={`mobile-${index}`} className="min-w-full px-2 flex justify-center">
                                                <div className="relative group overflow-hidden rounded-lg w-full md:w-[80%] border border-white/10 bg-black">
                                                    <div className="relative w-full pt-[56.25%]">
                                                        {isPlaying && (
                                                            <VimeoPlayer
                                                                project={project}
                                                                playerKey={playerKey}
                                                                isLoading={isLoading}
                                                                isSlow={slowVideoKey === playerKey}
                                                                onLoaded={() => clearLoadingForKey(playerKey)}
                                                            />
                                                        )}
                                                        <div className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                                                            <Image
                                                                src={project.thumbnail}
                                                                alt={t(project.title)}
                                                                fill
                                                                sizes="100vw"
                                                                quality={72}
                                                                className="object-cover contrast-110 saturate-110"
                                                            />
                                                            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent" />
                                                        </div>
                                                        {!isPlaying && (
                                                            <div
                                                                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                                                                onClick={() => toggleVideo(playerKey)}
                                                            >
                                                                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center transform group-hover:scale-105 transition-all shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)]">
                                                                    <Play fill="black" className="text-black ml-1" size={36} />
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className={`absolute bottom-2 left-0 right-0 z-10 p-6 transition-opacity duration-300 pointer-events-none ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                                                            <div className="text-center space-y-2">
                                                                <h3 className="text-2xl md:text-3xl font-bold text-white">{t(project.subtitle)}</h3>
                                                                <p className="text-gray-300 text-sm">{t(project.title)}</p>
                                                            </div>
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
                                                : "bg-white/25 hover:bg-white/45 w-2.5 h-2.5"
                                        )}
                                        aria-label={`${t("Go to slide")} ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                    {/* ==================== DESKTOP CAROUSEL (>= 1024px) ==================== */}
                        <div
                            className="relative left-1/2 hidden w-[calc(100vw-2rem)] -translate-x-1/2 transform-gpu lg:block"
                        >
                            <div
                                ref={desktopCarouselRef}
                                className="relative w-full overflow-hidden"
                                style={{ height: carouselDims.centerH }}
                            >
                            {/* 5 absolutely positioned slides */}
                            {[-2, -1, 0, 1, 2].map((offset) => {
                                const projectIndex = getProjectIndex(offset);
                                const project = projects[projectIndex];
                                const slot = offset + slotOffset;
                                const style = getSlotStyle(slot, carouselDims);
                                const isCenter = slot === 0;
                                const playerKey = getVideoKey("desktop", activeCategory, projectIndex, project);
                                const isPlaying = playingVideoKey === playerKey && isCenter;
                                const isLoading = loadingVideoKey === playerKey;

                                return (
                                    <div
                                        key={`desktop-${offset}`}
                                        className={cn(
                                            "absolute rounded-lg overflow-hidden group bg-black border border-white/10",
                                            isCenter ? "z-20 shadow-[0_34px_90px_-42px_rgba(0,0,0,1)]" : "z-10"
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
                                        {/* Vimeo player - only for current center when playing */}
                                        {offset === 0 && isPlaying && (
                                            <VimeoPlayer
                                                project={project}
                                                playerKey={playerKey}
                                                isLoading={isLoading}
                                                isSlow={slowVideoKey === playerKey}
                                                onLoaded={() => clearLoadingForKey(playerKey)}
                                            />
                                        )}

                                        {/* Thumbnail */}
                                        <div className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                                            <Image
                                                src={project.thumbnail}
                                                alt={t(project.title)}
                                                fill
                                                sizes={isCenter ? `${carouselDims.centerW}px` : `${carouselDims.sideW}px`}
                                                quality={72}
                                                className={`object-cover contrast-110 saturate-110 ${isCenter ? "group-hover:scale-[1.025] transition-transform duration-700" : ""}`}
                                            />
                                            <div className={cn(
                                                "absolute inset-0",
                                                isCenter
                                                    ? "bg-linear-to-t from-black/82 via-black/10 to-transparent"
                                                    : "bg-black/35"
                                            )} />
                                        </div>

                                        {/* Play Button - only on center when not playing */}
                                        {isCenter && !isPlaying && (
                                            <div
                                                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                                                onClick={() => toggleVideo(playerKey)}
                                            >
                                                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center transform group-hover:scale-105 transition-all shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)]">
                                                    <Play fill="black" className="text-black ml-1" size={36} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Title overlay — center only */}
                                        {isCenter && (
                                            <div className={`absolute bottom-0 left-0 right-0 z-10 p-6 transition-opacity duration-300 pointer-events-none ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                                                <div className="text-center space-y-1.5">
                                                    <h3 className="text-2xl font-semibold text-white drop-shadow-md">{t(project.subtitle)}</h3>
                                                    <p className="text-gray-300 text-sm tracking-wide">{t(project.title)}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Navigation Arrows — centered on side thumbnails */}
                            <button
                                onClick={goToPrevDesktop}
                                disabled={isAnimating}
                                className="absolute z-40 w-12 h-12 bg-white/90 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_14px_34px_-24px_rgba(0,0,0,0.95)] ring-1 ring-black/10 cursor-pointer"
                                style={{
                                    left: `calc(50% - ${carouselDims.centerW / 2 + carouselDims.gap + carouselDims.sideW / 2}px)`,
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                                aria-label={t("Previous")}
                            >
                                <ChevronLeft size={24} className="text-black" />
                            </button>
                            <button
                                onClick={goToNextDesktop}
                                disabled={isAnimating}
                                className="absolute z-40 w-12 h-12 bg-white/90 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_14px_34px_-24px_rgba(0,0,0,0.95)] ring-1 ring-black/10 cursor-pointer"
                                style={{
                                    left: `calc(50% + ${carouselDims.centerW / 2 + carouselDims.gap + carouselDims.sideW / 2}px)`,
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                                aria-label={t("Next")}
                            >
                                <ChevronRight size={24} className="text-black" />
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Subtle horizontal divider at the very bottom ── */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 pointer-events-none" />
        </section>
    );
}
