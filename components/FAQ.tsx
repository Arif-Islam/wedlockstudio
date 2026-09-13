import FAQAccordion from "@/components/FAQAccordion";

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
    return (
        <section
            id="faq"
            className="relative overflow-hidden bg-white pb-14 pt-10 text-black md:pb-20 md:pt-14 lg:pb-24 lg:pt-16"
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

                <FAQAccordion faqs={faqs} />
            </div>
        </section>
    );
}
