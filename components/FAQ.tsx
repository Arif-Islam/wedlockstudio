"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
        answer: "We believe in clear and consistent communication. We can collaborate via email, Slack, or WhatsApp depending on your preference. reliable updates throughout the editing process ensure we stay aligned with your goals."
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
        <section id="faq" className="py-20 bg-gray-50 text-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Frequently Asked <span className="text-[#DBA73D]">Questions</span>
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Have questions? We have answers. If you don&apos;t see your question here, feel free to <a href="mailto:contact@wedlockstudio.com" className="text-[#DBA73D] hover:underline">contact us</a>.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                            >
                                <span className={cn("text-lg font-semibold transition-colors duration-300 pr-4", openIndex === index ? "text-[#DBA73D]" : "text-gray-800")}>
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-[#DBA73D] w-5 h-5 shrink-0" />
                                ) : (
                                    <ChevronDown className="text-gray-400 w-5 h-5 shrink-0" />
                                )}
                            </button>
                            <div
                                className={cn(
                                    "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                                    openIndex === index ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
