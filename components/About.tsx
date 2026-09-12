import Image from "next/image";
import { AboutAnimatedStat } from "@/components/AboutAnimatedStat";

const editPrinciples = [
    {
        value: "01",
        title: "Shape the story",
        description: "We find the emotional thread, trim the noise, and build a rhythm that feels natural.",
    },
    {
        value: "02",
        title: "Refine the finish",
        description: "Color, sound, pacing, captions, and delivery formats are polished before handoff.",
    },
    {
        value: "03",
        title: "Keep reviews clear",
        description: "Organized feedback rounds and practical updates keep the edit moving without confusion.",
    },
];

export default function About() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-[#f4f1eb] py-14 sm:py-20 lg:py-24"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-black/15 to-transparent" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.55fr)] lg:items-end">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#b57900]">
                            Our Story
                        </p>
                        <h2 className="max-w-4xl text-3xl font-bold leading-tight text-[#181714] sm:text-4xl lg:text-5xl">
                            Editing that turns raw footage into a finished story.
                        </h2>
                    </div>

                    <div className="max-w-xl lg:justify-self-end">
                        <p className="text-base leading-7 text-[#625d53] sm:text-lg">
                            WedLockStudio helps wedding filmmakers, creators, and brands transform scattered footage into films with rhythm, emotion, and a cinematic finish.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6f685d]">
                            <span className="rounded-full border border-black/10 bg-[#fbfaf7] px-3 py-2">Story</span>
                            <span className="rounded-full border border-black/10 bg-[#fbfaf7] px-3 py-2">Color</span>
                            <span className="rounded-full border border-black/10 bg-[#fbfaf7] px-3 py-2">Sound</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch xl:gap-8">
                    <div className="relative overflow-hidden rounded-lg border border-black/10 bg-[#fbfaf7] shadow-[0_24px_70px_-48px_rgba(0,0,0,0.9)]">
                        <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:h-full lg:min-h-[520px]">
                            <Image
                                src="https://res.cloudinary.com/djbh7xuqv/image/upload/v1772218358/producer-songwriter-mixing-mastering-tracks-with-stereo-gear_ocuzit.jpg"
                                alt="WedLockStudio post-production desk"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 58vw"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/25 to-transparent p-5 sm:p-7">
                                <p className="max-w-xl text-xl font-semibold leading-snug text-white sm:text-2xl">
                                    We treat every edit like a film, not a file export.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-4 sm:gap-5">
                            <AboutAnimatedStat
                                label="Projects Completed"
                                target={1000}
                                suffix="+"
                            />
                            <AboutAnimatedStat
                                label="Client Satisfaction"
                                target={100}
                                suffix="%"
                            />
                        </div>

                        <div className="rounded-lg border border-black/10 bg-[#fbfaf7] p-5 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.8)] sm:p-6 lg:flex-1">
                            <div className="mb-5 flex items-center justify-between gap-4 border-b border-black/10 pb-4">
                                <h3 className="text-xl font-bold text-[#181714] sm:text-2xl">
                                    How we shape the edit
                                </h3>
                                <span className="hidden rounded-full bg-[#181714] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold sm:inline-flex">
                                    Studio
                                </span>
                            </div>

                            <div className="divide-y divide-black/10">
                                {editPrinciples.map((item) => (
                                    <div key={item.value} className="grid grid-cols-[44px_1fr] gap-4 py-4 first:pt-0 last:pb-0">
                                        <span className="text-sm font-bold text-[#b57900]">
                                            {item.value}
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-[#181714]">
                                                {item.title}
                                            </h4>
                                            <p className="mt-1 text-sm leading-6 text-[#666055]">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
