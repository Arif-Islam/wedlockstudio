"use client";

import { useRef, useState } from "react";
import { Mail, Phone, Globe, Send, CheckCircle, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Contact() {
    const { t } = useLanguage();
    const form = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [formError, setFormError] = useState<"" | "Please complete all required fields." | "Please enter a valid email address." | "Failed to send message. Please try again.">("");

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        const values = new FormData(form.current);
        const name = String(values.get("user_name") ?? "").trim();
        const email = String(values.get("user_email") ?? "").trim();
        const message = String(values.get("message") ?? "").trim();

        if (!name || !email || !message) {
            setFormError("Please complete all required fields.");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setFormError("Please enter a valid email address.");
            return;
        }

        setIsSending(true);
        setFormError("");

        try {
            const emailjs = await import("@emailjs/browser");
            await emailjs.sendForm(
                "service_l3koimq",
                "template_pmqw4xb",
                form.current,
                "Public Key"
            );
            setIsSent(true);
        } catch {
            setFormError("Failed to send message. Please try again.");
            alert(t("Failed to send message. Please try again."));
        } finally {
            setIsSending(false);
        }
    };

    const contactItems = [
        {
            icon: <Mail size={22} />,
            label: "Email Us",
            value: "contact@wedlockstudio.com",
            href: "mailto:contact@wedlockstudio.com",
        },
        {
            icon: <Phone size={22} />,
            label: "Call Us",
            value: "+1 (555) 123-4567",
            href: "tel:+15551234567",
        },
        {
            icon: <MapPin size={22} />,
            label: "Location",
            value: "Sylhet, Bangladesh",
            href: null,
        },
        {
            icon: <Globe size={22} />,
            label: "Service Area",
            value: "Available Globally",
            href: null,
        },
    ];

    return (
        <section
            id="contact"
            className="relative py-20 md:py-28 overflow-hidden bg-[#151411]"
        >
            {/* Thin gold vertical accent line — desktop only */}
            <div className="absolute top-1/2 right-6 w-px h-40 bg-linear-to-b from-transparent via-white/20 to-transparent -translate-y-1/2 hidden xl:block pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-14 md:mb-16">
                    <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                        {t("Contact")}
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                        {t("Get In")} <span className="text-gold">{t("Touch")}</span>
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                        {t("Ready to start your project? Send us a message and we'll get back to you within 24 hours.")}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14">
                    {/* Contact Info — left column */}
                    <div className="lg:col-span-2 flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">
                            {t("Contact Information")}
                        </h3>

                        <div className="space-y-6">
                            {contactItems.map((item) => (
                                <div key={item.label} className="flex items-start gap-4 group">
                                    <div className="w-11 h-11 rounded-lg bg-[#22201c] border border-white/10 shadow-sm flex items-center justify-center shrink-0 text-gold transition-colors group-hover:border-gold/45">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">{t(item.label)}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="text-gray-300 font-medium hover:text-gold transition-colors"
                                            >
                                                {item.value === "Available Globally" ? t(item.value) : item.value}
                                            </a>
                                        ) : (
                                        <p className="text-gray-300 font-medium">{item.value === "Available Globally" ? t(item.value) : item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Decorative divider — mobile/tablet only */}
                        <div className="mt-8 lg:hidden h-px w-full bg-white/10" />
                    </div>

                    {/* Form — right column */}
                    <div className="lg:col-span-3">
                        <div className="relative">
                            <div className="relative bg-[#22201c] rounded-lg border border-white/10 shadow-[0_24px_70px_-44px_rgba(0,0,0,1)] p-7 sm:p-9 min-h-[460px] flex flex-col justify-center">
                                {isSent ? (
                                    <div className="text-center animate-fade-in">
                                        <div className="w-20 h-20 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/30">
                                            <CheckCircle size={40} className="text-green-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{t("Message Sent!")}</h3>
                                        <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                                            {t("Thank you for reaching out. We will get back to you shortly.")}
                                        </p>
                                        <button
                                            onClick={() => setIsSent(false)}
                                            className="text-gold font-semibold hover:underline cursor-pointer"
                                        >
                                            {t("Send another message")}
                                        </button>
                                    </div>
                                ) : (
                                    <form ref={form} noValidate onChange={() => formError && setFormError("")} onSubmit={sendEmail} className="space-y-5">
                                        {formError && (
                                            <p className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-200" role="alert">
                                                {t(formError)}
                                            </p>
                                        )}
                                        {/* Name & Email — side by side on md+ */}
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="user_name" className="block text-sm font-medium text-gray-400 mb-1.5">
                                                    {t("Your Name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="user_name"
                                                    id="user_name"
                                                    className="w-full bg-[#151411] border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                                                    placeholder={t("John Doe")}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="user_email" className="block text-sm font-medium text-gray-400 mb-1.5">
                                                    {t("Email Address")}
                                                </label>
                                                <input
                                                    type="email"
                                                    name="user_email"
                                                    id="user_email"
                                                    className="w-full bg-[#151411] border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                                                    placeholder={t("john@example.com")}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1.5">
                                                {t("Message")}
                                            </label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows={5}
                                                className="w-full bg-[#151411] border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all resize-none"
                                                placeholder={t("Tell us about your project...")}
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSending}
                                            className="w-full bg-gold text-black font-bold py-3.5 rounded-md hover:bg-[#e2b14c] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                                        >
                                            {isSending ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    {t("Sending...")}
                                                </span>
                                            ) : (
                                                <>
                                                    {t("Send Message")} <Send size={18} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
