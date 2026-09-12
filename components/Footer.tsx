import Link from "next/link";
import Image from "next/image";
import {
    ArrowUpRight,
    Facebook,
    Instagram,
    Linkedin,
    MailOpen,
    MessageCircle,
    Twitter,
    Youtube,
} from "lucide-react";

const footerLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Packages", href: "#packages" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
];

const serviceLinks = [
    { name: "Wedding Films", href: "#projects" },
    { name: "Creator Edits", href: "#packages" },
    { name: "Brand Videos", href: "#process" },
    { name: "Testimonials", href: "#testimonials" },
];

const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "YouTube", href: "#", icon: Youtube },
];

export default function Footer() {
    return (
        <footer className="bg-[#151411] text-white border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="py-12 sm:py-14 lg:py-16">
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.1fr]">
                        <div>
                            <Link href="/" className="inline-flex">
                                <Image
                                    src="/images/logo-transparent.png"
                                    alt="WedLockStudio Logo"
                                    width={659}
                                    height={608}
                                    sizes="96px"
                                    className="h-20 w-auto object-contain object-left sm:h-24"
                                />
                            </Link>
                            <p className="mt-4 max-w-sm text-sm leading-6 text-[#c7c0b3]">
                                Cinematic video editing for weddings, creators, and brands that want every frame to feel intentional.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href="https://wa.me/1234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4b34d]"
                                >
                                    <MessageCircle size={17} />
                                    WhatsApp
                                </a>
                                <a
                                    href="mailto:contact@wedlockstudio.com"
                                    className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-gold/70 hover:text-gold"
                                >
                                    <MailOpen size={17} />
                                    Email
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ede8df]">
                                Explore
                            </h3>
                            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-[#a9a194] sm:grid-cols-1">
                                {footerLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="inline-flex items-center gap-1.5 transition-colors hover:text-gold"
                                        >
                                            {link.name}
                                            <ArrowUpRight size={13} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ede8df]">
                                Services
                            </h3>
                            <ul className="mt-5 space-y-3 text-sm text-[#a9a194]">
                                {serviceLinks.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="transition-colors hover:text-gold">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ede8df]">
                                Connect
                            </h3>
                            <div className="mt-5 space-y-3 text-sm text-[#a9a194]">
                                <a
                                    href="mailto:contact@wedlockstudio.com"
                                    className="block break-all transition-colors hover:text-gold"
                                >
                                    contact@wedlockstudio.com
                                </a>
                                <a
                                    href="https://wa.me/1234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block transition-colors hover:text-gold"
                                >
                                    WhatsApp consultation
                                </a>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                                {socialLinks.map(({ name, href, icon: Icon }) => (
                                    <a
                                        key={name}
                                        href={href}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-[#c7c0b3] transition-all hover:-translate-y-0.5 hover:border-gold/70 hover:text-gold"
                                        aria-label={name}
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-[#8f887c] sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {new Date().getFullYear()} WedLockStudio. All rights reserved.</p>
                    <p className="uppercase tracking-[0.2em]">Video editing agency</p>
                </div>
            </div>
        </footer>
    );
}
