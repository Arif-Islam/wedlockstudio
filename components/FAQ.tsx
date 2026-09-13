"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "What is your typical turnaround time for a video project?",
        answer: "Our standard turnaround time depends on the complexity and length of the project. For most social media content and short edits, we deliver within 24-48 hours. More complex projects like documentaries or full-length YouTube videos typically take 3-5 business days. We also offer rush delivery options for urgent deadlines."
    },
    {
        question: "Do you offer revisions if I'm not satisfied with the first draft?",
        answer: "Absolutely. We want you to be 100% happy with the final product. All our packages include up to 3 rounds of revisions at no extra cost. We work closely with you to ensure your vision is captured perfectly."
    },
    {
        question: "How do I send my raw footage to you?",
        answer: "We use secure and fast file transfer services like Google Drive, Dropbox, or WeTransfer. Once you onboard with us, we'll set up a dedicated shared folder for your project where you can easily upload your raw files and assets."
    },
    {
        question: "What software do you use for editing?",
        answer: "We use industry-standard professional software including Adobe Premiere Pro, After Effects, and DaVinci Resolve. This ensures high-quality output and compatibility with various workflows."
    },
    {
        question: "Can you help with finding music and sound effects?",
        answer: "Yes, we have access to extensive libraries of royalty-free music and sound effects. We carefully select audio that matches the mood and pacing of your video, ensuring no copyright issues for your content."
    },
    {
        question: "Do you offer thumbnail design services?",
        answer: "Yes! A great video needs a great click-through rate. We offer custom thumbnail design as an add-on or as part of our comprehensive packages to help your videos perform better."
    },
    {
        question: "What are your pricing models?",
        answer: "We offer both project-based pricing and monthly retainer packages. Project-based pricing is ideal for one-off videos, while our retainers offer better value for creators and businesses needing consistent weekly content."
    },
    {
        question: "Do you provide source files?",
        answer: "Typically, we deliver the final rendered video files. Delivery of project files (Premiere/After Effects projects) can be arranged for an additional fee, as they contain our proprietary assets and workflows."
    },
    {
        question: "How do we communicate during the project?",
        answer: "We believe in clear and consistent communication. We can collaborate via email, Slack, or WhatsApp depending on your preference. Reliable updates throughout the editing process ensure we stay aligned with your goals."
    },
    {
        question: "Can you edit vertical videos for TikTok, Reels, and Shorts?",
        answer: "Specializing in short-form content is one of our core strengths. We know how to edit for retention, using dynamic captions, pacing, and visual hooks to maximize engagement on platforms like TikTok, Instagram Reels, and YouTube Shorts."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="faq"
            className="relative overflow-hidden bg-white py-14 text-black md:py-20 lg:py-24"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mx-auto mb-9 max-w-3xl text-center md:mb-11">
                    <div className="mb-3 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-gold/55 sm:w-12" aria-hidden="true" />
                        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">FAQ</p>
                        <span className="h-px w-8 bg-gold/55 sm:w-12" aria-hidden="true" />
                    </div>

                    <h2 className="text-3xl font-bold leading-tight tracking-normal sm:text-4xl lg:text-5xl">
                        Questions before the <span className="text-gold">first edit</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                        Timelines, revisions, file delivery, pricing, and the details clients usually want clear before we start.
                    </p>

                    <a
                        href="mailto:contact@wedlockstudio.com"
                        className="mt-5 inline-flex items-center justify-center rounded-full border border-black/10 bg-[#fbfaf7] px-5 py-2.5 text-sm font-bold text-[#181714] shadow-[0_14px_34px_-30px_rgba(0,0,0,0.55)] transition-colors hover:border-gold/60 hover:text-[#b57900]"
                    >
                        Ask a question
                    </a>
                </div>

                <div className="mx-auto grid max-w-6xl items-start gap-4 lg:grid-cols-2 lg:gap-5">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group overflow-hidden rounded-lg border bg-[#fbfaf7] shadow-[0_14px_42px_-38px_rgba(0,0,0,0.65)] transition-all duration-300",
                                openIndex === index
                                    ? "border-gold/45 bg-white shadow-[0_22px_60px_-44px_rgba(0,0,0,0.78)]"
                                    : "border-black/10 hover:border-black/20 hover:bg-white"
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => toggleFAQ(index)}
                                className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-5 text-left focus:outline-none sm:px-6"
                                aria-expanded={openIndex === index}
                            >
                                <span className="flex min-w-0 gap-4">
                                    <span
                                        className={cn(
                                            "mt-0.5 text-xs font-extrabold uppercase tracking-[0.2em] transition-colors",
                                            openIndex === index ? "text-gold" : "text-neutral-400"
                                        )}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className={cn(
                                            "text-base font-bold leading-6 transition-colors sm:text-lg sm:leading-7",
                                            openIndex === index ? "text-[#181714]" : "text-neutral-800"
                                        )}
                                    >
                                        {faq.question}
                                    </span>
                                </span>

                                <span
                                    className={cn(
                                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                                        openIndex === index
                                            ? "border-gold bg-gold text-black"
                                            : "border-black/10 bg-white text-neutral-500 group-hover:border-gold/50 group-hover:text-[#b57900]"
                                    )}
                                    aria-hidden="true"
                                >
                                    {openIndex === index ? (
                                        <Minus className="h-4 w-4" />
                                    ) : (
                                        <Plus className="h-4 w-4" />
                                    )}
                                </span>
                            </button>
                            <div
                                className={cn(
                                    "grid transition-all duration-300 ease-in-out",
                                    openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                                        <p className="border-l-2 border-gold/55 pl-4 text-sm leading-7 text-neutral-600 sm:text-[15px]">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
