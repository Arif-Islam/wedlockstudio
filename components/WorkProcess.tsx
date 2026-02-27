import { Search, ClipboardList, Video, Scissors, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const processSteps = [
    {
        id: "01",
        title: "Discovery & Strategy",
        description: "We explore your brand, goals, and audience to shape the right strategy.",
        icon: Search,
    },
    {
        id: "02",
        title: "Pre-Production",
        description: "We plan the script, storyboard, and all production details.",
        icon: ClipboardList,
    },
    {
        id: "03",
        title: "Production",
        description: "We film with pro lighting, sound, and direction.",
        icon: Video,
    },
    {
        id: "04",
        title: "Post-Production",
        description: "We edit, grade, and polish your video.",
        icon: Scissors,
    },
    {
        id: "05",
        title: "Delivery & Launch",
        description: "We finalize files and launch your project.",
        icon: Rocket,
    }
];

export default function WorkProcess() {
    return (
        <section
            id="process"
            className="relative py-20 md:py-28 overflow-hidden font-sans bg-[#1c1c1c]"
        >
            {/* Background glowing orbs */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
                <div className="text-center mb-16 md:mb-24">
                    <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                        How We Work
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white">
                        Our <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-yellow-200">Work Process</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                        A streamlined, transparent approach designed to transform your ideas into exceptional visual experiences without any hassle.
                    </p>
                </div>

                <div className="relative max-w-6xl 2xl:max-w-7xl mx-auto">
                    {/* Horizontal Dashed Line (Desktop/Tablet) */}
                    <div className="hidden md:block absolute top-[50%] left-[10%] right-[10%] 2xl:left-[6%] 2xl:right-[6%] h-px border-t-2 border-dashed border-white/70 z-0 -translate-y-1/2" />

                    {/* Vertical Dashed Line (Mobile) */}
                    <div className="block md:hidden absolute left-[39px] top-[45px] bottom-[45px] w-px border-l-2 border-dashed border-white/70 z-0" />

                    <div className="grid md:grid-cols-5 gap-10 md:gap-4 relative z-10">
                        {processSteps.map((step, idx) => {
                            const isTop = idx % 2 !== 0; // Steps 2 and 4
                            return (
                                <div key={idx} className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-0 group h-full">

                                    {/* Desktop Top Text */}
                                    <div className={cn(
                                        "hidden md:flex flex-col justify-end flex-1 text-center pb-6 md:pb-8",
                                        isTop ? "opacity-100" : "invisible opacity-0"
                                    )}>
                                        <h3 className="text-xl font-bold text-white mb-2 md:mb-3">{step.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Icon & Number (Mobile & Desktop) */}
                                    <div className="relative shrink-0 flex flex-col items-center z-10 transition-transform duration-300 md:group-hover:-translate-y-2">
                                        <div className="w-[80px] h-[80px] rounded-2xl bg-[#2a2a2a] border border-gray-700 shadow-xl shadow-black/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-gold/50 group-hover:shadow-gold/20 z-10 text-gold group-hover:text-yellow-200">
                                            <step.icon size={32} className="transition-colors" />
                                        </div>
                                        <div className={cn(
                                            "absolute bg-gold text-black font-bold text-xs px-3 py-1 rounded-full border-2 border-[#1c1c1c] shadow-md z-20",
                                            isTop ? "md:-top-4 md:bottom-auto -bottom-4 md:mt-0 mt-0" : "-bottom-4 md:-bottom-5"
                                        )}>
                                            {step.id}
                                        </div>
                                    </div>

                                    {/* Bottom Text (Mobile & Desktop) */}
                                    <div className={cn(
                                        "flex-1 md:flex md:flex-col md:justify-start md:text-center pt-2 md:pt-6 md:pb-0",
                                        !isTop ? "opacity-100" : "md:invisible md:opacity-0"
                                    )}>
                                        <h3 className="text-xl font-bold text-white mb-2 md:mb-3">{step.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Subtitle / Note at the bottom */}
                <div className="mt-16 md:mt-24 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#2a2a2a]/50 border border-gray-700/50 rounded-full px-5 py-2.5 backdrop-blur-sm text-sm text-gray-400">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                        </span>
                        Average project turnaround time is <strong className="text-gray-300">1-3 weeks</strong> depending on complexity.
                    </div>
                </div>
            </div>
        </section>
    );
}
