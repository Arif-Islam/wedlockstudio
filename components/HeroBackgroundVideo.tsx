"use client";

import { useEffect, useState } from "react";

const HERO_VIDEO_SRC = "/videos/hero_video.mp4";

export default function HeroBackgroundVideo() {
    const [shouldLoad, setShouldLoad] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const timers: number[] = [];
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const loadVideo = () => setShouldLoad(true);
        const scheduleLoad = (delay: number) => {
            timers.push(window.setTimeout(loadVideo, delay));
        };

        const handleWindowLoad = () => scheduleLoad(isMobile ? 1400 : 350);

        if (document.readyState === "complete") {
            scheduleLoad(isMobile ? 1400 : 350);
        } else {
            scheduleLoad(isMobile ? 2400 : 1200);
            window.addEventListener("load", handleWindowLoad, { once: true });
        }

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer));
            window.removeEventListener("load", handleWindowLoad);
        };
    }, []);

    if (!shouldLoad) return null;

    return (
        <video
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onCanPlay={() => setVideoLoaded(true)}
        >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
    );
}
