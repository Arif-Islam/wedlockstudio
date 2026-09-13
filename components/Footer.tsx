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
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
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
        <footer className="border-t border-white/10 bg-[#151411] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-10 sm:py-12 lg:py-14">
                    <div className="grid gap-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.8fr)_minmax(280px,0.9fr)] lg:items-start">
                        <div className="max-w-md">
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
                            <p className="mt-4 text-sm leading-6 text-[#c7c0b3]">
                                Cinematic video editing for weddings, creators, and brands that want every frame to feel intentional.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2.5">
                                <a
                                    href="https://wa.me/1234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#e4b34d]"
                                >
                                    <MessageCircle size={17} />
                                    WhatsApp
                                </a>
                                <a
                                    href="mailto:contact@wedlockstudio.com"
                                    className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:border-gold/70 hover:text-gold"
                                >
                                    <MailOpen size={17} />
                                    Email
                                </a>
                            </div>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-6">
                            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ede8df]">
                                Explore
                            </h3>
                            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-[#a9a194]">
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

                        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-6">
                            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ede8df]">
                                Connect
                            </h3>
                            <div className="mt-5 space-y-3 text-sm text-[#a9a194]">
                                <a
                                    href="mailto:contact@wedlockstudio.com"
                                    className="block break-all font-medium transition-colors hover:text-gold"
                                >
                                    contact@wedlockstudio.com
                                </a>
                                <a
                                    href="https://wa.me/1234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block font-medium transition-colors hover:text-gold"
                                >
                                    WhatsApp consultation
                                </a>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-2.5">
                                {socialLinks.map(({ name, href, icon: Icon }) => (
                                    <a
                                        key={name}
                                        href={href}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/10 text-[#c7c0b3] transition-all hover:-translate-y-0.5 hover:border-gold/70 hover:text-gold"
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
