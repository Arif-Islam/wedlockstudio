"use client";

import { useRef, useState } from "react";
import { Mail, Phone, Globe, Send, CheckCircle, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        if (form.current) {
            emailjs
                .sendForm(
                    "service_l3koimq",
                    "template_pmqw4xb",
                    form.current,
                    "Public Key"
                )
                .then(
                    (result) => {
                        console.log(result.text);
                        setIsSent(true);
                        setIsSending(false);
                    },
                    (error) => {
                        console.log(error.text);
                        alert("Failed to send message. Please try again.");
                        setIsSending(false);
                    }
                );
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
            className="relative py-20 md:py-28 overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #ffffff 0%, #fdfbf7 40%, #faf9f6 70%, #ffffff 100%)",
            }}
        >
            {/* Decorative background elements */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-10 right-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />

            {/* Thin gold vertical accent line — desktop only */}
            <div className="absolute top-1/2 right-6 w-px h-40 bg-linear-to-b from-transparent via-gold/20 to-transparent -translate-y-1/2 hidden xl:block pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-14 md:mb-16">
                    <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                        Contact
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight">
                        Get In <span className="text-gold">Touch</span>
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                        Ready to start your project? Send us a message and we&apos;ll get back to you within 24 hours.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14">
                    {/* Contact Info — left column */}
                    <div className="lg:col-span-2 flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-black mb-8">
                            Contact Information
                        </h3>

                        <div className="space-y-6">
                            {contactItems.map((item) => (
                                <div key={item.label} className="flex items-start gap-4 group">
                                    <div className="w-11 h-11 rounded-xl bg-white/80 backdrop-blur-sm border border-gold/10 shadow-sm flex items-center justify-center shrink-0 text-gold transition-colors group-hover:bg-gold/10">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="text-gray-800 font-medium hover:text-gold transition-colors"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-gray-800 font-medium">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Decorative divider — mobile/tablet only */}
                        <div className="mt-8 lg:hidden h-px w-full bg-linear-to-r from-transparent via-gold/20 to-transparent" />
                    </div>

                    {/* Form — right column */}
                    <div className="lg:col-span-3">
                        <div className="relative">
                            {/* Gold glow behind card */}
                            <div className="absolute -inset-1.5 rounded-2xl bg-gold/8 blur-lg pointer-events-none" />

                            <div className="relative bg-white rounded-2xl border border-gold/10 shadow-xl p-7 sm:p-9 min-h-[460px] flex flex-col justify-center">
                                {isSent ? (
                                    <div className="text-center animate-fade-in">
                                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-200">
                                            <CheckCircle size={40} className="text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-black mb-3">Message Sent!</h3>
                                        <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                                            Thank you for reaching out. We will get back to you shortly.
                                        </p>
                                        <button
                                            onClick={() => setIsSent(false)}
                                            className="text-gold font-semibold hover:underline cursor-pointer"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form ref={form} onSubmit={sendEmail} className="space-y-5">
                                        {/* Name & Email — side by side on md+ */}
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="user_name"
                                                    id="user_name"
                                                    className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="user_email"
                                                    id="user_email"
                                                    className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Message
                                            </label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows={5}
                                                className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all resize-none"
                                                placeholder="Tell us about your project..."
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSending}
                                            className="w-full bg-gold text-black font-bold py-3.5 rounded-xl hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                                        >
                                            {isSending ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : (
                                                <>
                                                    Send Message <Send size={18} />
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
