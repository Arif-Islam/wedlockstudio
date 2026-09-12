"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MailOpen, Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Packages", href: "#packages" },
    {
        name: "More",
        href: "#",
        children: [
            { name: "MEET OUR TEAM", href: "#team" },
            { name: "WORK PROCESS", href: "#process" },
            { name: "TESTIMONIALS", href: "#testimonials" },
            { name: "CONTACT", href: "#contact" },
            { name: "FAQ", href: "#faq" },
        ]
    },
];

// Flattened list for mobile
const mobileNavItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Packages", href: "#packages" },
    { name: "Meet Our Team", href: "#team" },
    { name: "Work Process", href: "#process" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#faq" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-black/10 bg-[#fbfaf7]/95 text-[#181714] shadow-[0_14px_36px_-30px_rgba(0,0,0,0.95)] backdrop-blur-md">
            <div className="container mx-auto flex min-h-[78px] items-center justify-between gap-4 px-4 py-2.5 lg:min-h-[86px]">
                <div className="flex min-w-0 flex-col items-start justify-center">
                    <Link
                        href="/"
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setMobileMenuOpen(false);
                        }}
                        className="inline-flex"
                        aria-label="Go to top"
                    >
                        <Image
                            src="/images/logo-transparent-dark.png"
                            alt="WedLockStudio Logo"
                            width={659}
                            height={608}
                            sizes="80px"
                            className="h-12 w-auto object-contain object-left sm:h-14 lg:h-16"
                            priority
                        />
                    </Link>
                    <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#72706a] sm:text-[10px]">
                        Video editing agency
                    </span>
                </div>

                <nav className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/75 p-1.5 shadow-[0_12px_30px_-28px_rgba(0,0,0,0.8)] lg:flex">
                    {navItems.map((item) => (
                        <div key={item.name} className="relative group">
                            <a
                                href={item.href}
                                onClick={(e) => {
                                    if (item.children) {
                                        e.preventDefault();
                                    } else {
                                        scrollToSection(e, item.href);
                                    }
                                }}
                                className={cn(
                                    "flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#494641] transition-all duration-300 hover:bg-[#f1eadf] hover:text-[#b57900]",
                                    item.children && "pr-3.5"
                                )}
                            >
                                {item.name}
                                {item.children && (
                                    <ChevronDown
                                        size={14}
                                        className="mt-0.5 ml-0.5 transition-transform duration-300 group-hover:rotate-180"
                                    />
                                )}
                            </a>

                            {item.children && (
                                <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="overflow-hidden rounded-lg border border-black/10 bg-[#fbfaf7] py-2 shadow-[0_22px_56px_-34px_rgba(0,0,0,0.9)]">
                                        {item.children.map((child) => (
                                            <a
                                                key={child.name}
                                                href={child.href}
                                                onClick={(e) => scrollToSection(e, child.href)}
                                                className="block px-5 py-2.5 text-center text-sm font-medium text-[#5f5a51] transition-colors hover:bg-[#f1eadf] hover:text-[#b57900]"
                                            >
                                                {child.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="hidden items-center gap-2 lg:flex">
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/75 text-[#181714] transition-all hover:-translate-y-0.5 hover:border-green-500/50 hover:text-green-600"
                        aria-label="WhatsApp"
                    >
                        <MessageCircle size={19} />
                    </a>
                    <a
                        href="mailto:contact@wedlockstudio.com"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/75 text-[#181714] transition-all hover:-translate-y-0.5 hover:border-[#DBA73D]/60 hover:text-[#b57900]"
                        aria-label="Email"
                    >
                        <MailOpen size={19} />
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, "#contact")}
                        className="ml-1 inline-flex items-center rounded-full bg-[#181714] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-black"
                    >
                        Get quote
                    </a>
                </div>

                <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#181714] shadow-[0_10px_28px_-24px_rgba(0,0,0,0.9)] lg:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="absolute left-0 right-0 top-full border-t border-black/10 bg-[#fbfaf7] px-4 py-5 shadow-[0_22px_56px_-34px_rgba(0,0,0,0.9)] lg:hidden">
                    <nav className="grid grid-cols-2 gap-2">
                        {mobileNavItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="rounded-md border border-black/10 bg-white/70 px-4 py-3 text-center text-sm font-semibold text-[#3f3b35] transition-colors hover:border-[#DBA73D]/60 hover:text-[#b57900]"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-[#e4b34d]"
                            aria-label="WhatsApp"
                        >
                            <MessageCircle size={18} />
                            WhatsApp
                        </a>
                        <a
                            href="mailto:contact@wedlockstudio.com"
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-4 py-3 text-sm font-bold text-[#181714] transition-colors hover:border-[#DBA73D]/60 hover:text-[#b57900]"
                            aria-label="Email"
                        >
                            <MailOpen size={18} />
                            Email
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
