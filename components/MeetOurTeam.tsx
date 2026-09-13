import Image from "next/image";

const teamHighlights = [
    {
        title: "Editorial direction",
        description: "Story structure, pacing, music flow, and emotional rhythm.",
    },
    {
        title: "Post-production polish",
        description: "Color tone, sound detail, captions, exports, and review delivery.",
    },
];

const roles = ["Lead Editor", "Color Artist", "Sound Designer"];

export default function MeetOurTeam() {
    return (
        <section
            id="team"
            className="relative overflow-hidden bg-[#ede8df] py-14 sm:py-20 lg:py-24"
        >
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 border-b border-black/10 pb-7 lg:mb-10 lg:flex lg:items-end lg:justify-between lg:gap-12">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#b57900]">
                            The Creators
                        </p>
                        <h2 className="text-3xl font-bold leading-tight text-[#181714] sm:text-4xl lg:text-5xl">
                            A focused team behind every finished film.
                        </h2>
                    </div>

                    <div className="mt-5 max-w-md lg:mt-0">
                        <p className="text-base leading-7 text-[#625d53]">
                            Editors, storytellers, and finishers working together to make each frame feel intentional.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {roles.map((role) => (
                                <span
                                    key={role}
                                    className="rounded-full border border-black/10 bg-[#f7f3ec] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6f685d]"
                                >
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-black/10 bg-[#181714] shadow-[0_28px_80px_-50px_rgba(0,0,0,0.95)]">
                    <div className="grid lg:grid-cols-[1.18fr_0.82fr]">
                        <div className="grid bg-white/10 sm:grid-cols-2 lg:min-h-[560px]">
                            <div className="relative min-h-[320px] overflow-hidden sm:min-h-[460px] lg:min-h-full">
                                <Image
                                    src="https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto,w_1200/v1772217391/group-graphic-designers-working-computer_iojoen.jpg"
                                    alt="WedLockStudio team reviewing an edit"
                                    fill
                                    quality={72}
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-black/55 p-4 backdrop-blur-sm sm:bottom-5 sm:left-5 sm:right-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                                        Review Ready
                                    </p>
                                    <p className="mt-2 text-sm font-medium leading-5 text-white">
                                        Clean exports, clear notes, and polished delivery.
                                    </p>
                                </div>
                            </div>

                            <div className="relative min-h-[320px] overflow-hidden border-t border-white/10 sm:min-h-[460px] sm:border-l sm:border-t-0 lg:min-h-full">
                                <Image
                                    src="https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto,w_1200/v1772217721/male-female-graphic-designers-interacting-with-each-other_eqt93k.jpg"
                                    alt="WedLockStudio creative team collaborating"
                                    fill
                                    quality={72}
                                    className="object-cover object-top"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10 xl:p-12">
                            <div className="mb-5 inline-flex w-fit rounded-full border border-gold/40 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                                Studio Team
                            </div>
                            <h3 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                                The edit gets better when every specialist is aligned.
                            </h3>
                            <p className="mt-5 max-w-xl text-base leading-7 text-[#c7c0b3]">
                                From assembly to final export, the team keeps the story clear, the pacing intentional, and the look consistent.
                            </p>

                            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                                {teamHighlights.map((item) => (
                                    <div key={item.title} className="py-5">
                                        <h4 className="font-bold text-white">{item.title}</h4>
                                        <p className="mt-2 text-sm leading-6 text-[#aaa295]">
                                            {item.description}
                                        </p>
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
