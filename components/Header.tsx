"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MailOpen, Menu, X } from "lucide-react";
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
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#faq" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-white/90 backdrop-blur-md py-2 shadow-sm" : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo & Text - LEFT */}
                <div className="flex flex-col items-start justify-center">
                    <Link
                        href="/"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="relative w-32 h-10 md:w-36 md:h-12"
                    >
                        <Image
                            src="https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056120/logo_xlkvz7.jpg"
                            alt="WedLockStudio Logo"
                            fill
                            sizes="160px"
                            className="object-contain object-left"
                            priority
                        />
                    </Link>
                    <span
                        className={cn(
                            "text-[10px] tracking-[0.2em] font-medium uppercase mt-0.5",
                            isScrolled ? "text-gray-500" : "text-gray-300"
                        )}
                    >
                        Video editing agency
                    </span>
                </div>

                {/* Desktop Nav - CENTER/RIGHT */}
                <nav className="hidden lg:flex items-center space-x-8">
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
                                    "uppercase text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-1 cursor-pointer",
                                    isScrolled
                                        ? "text-gray-700 hover:text-[#DBA73D]"
                                        : "text-gray-200 hover:text-[#DBA73D]"
                                )}
                            >
                                {item.name}
                            </a>

                            {/* Dropdown for "More" */}
                            {item.children && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                    <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 overflow-hidden py-2">
                                        {item.children.map((child) => (
                                            <a
                                                key={child.name}
                                                href={child.href}
                                                onClick={(e) => scrollToSection(e, child.href)}
                                                className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#DBA73D] transition-colors text-center"
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

                {/* Right Icons - RIGHT */}
                <div className="hidden lg:flex items-center space-x-6">
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn("transition-colors", isScrolled ? "text-black hover:text-green-600" : "text-white hover:text-green-500")}
                        aria-label="WhatsApp"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                    </a>
                    <a
                        href="mailto:contact@wedlockstudio.com"
                        className={cn("transition-colors", isScrolled ? "text-black hover:text-blue-600" : "text-white hover:text-blue-500")}
                        aria-label="Email"
                    >
                        <MailOpen size={20} />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={cn("lg:hidden", isScrolled ? "text-black" : "text-white")}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md py-8 px-4 flex flex-col space-y-4 shadow-xl border-t border-gray-100">
                    {mobileNavItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="text-gray-800 hover:text-[#DBA73D] text-lg font-medium text-center py-2 border-b border-gray-100 last:border-0"
                        >
                            {item.name}
                        </a>
                    ))}
                    <div className="flex justify-center space-x-8 mt-6 pt-4">
                        <a href="https://wa.me/1234567890" className="text-gray-800 hover:text-green-600" aria-label="WhatsApp">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                        </a>
                        <a href="mailto:contact@wedlockstudio.com" className="text-gray-800 hover:text-blue-600" aria-label="Email">
                            <MailOpen size={24} />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
