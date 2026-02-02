"use client";

import { useRef, useState } from "react";
import { Mail, Phone, Globe, Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        if (form.current) {
            // Replace these with your actual EmailJS credentials
            // Service ID, Template ID, Public Key
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

    return (
        <section id="contact" className="py-20 bg-white text-black relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Get In <span className="text-gold">Touch</span>
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Ready to start your project? Send us a message and we&apos;ll get back to you within 24 hours.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-black mb-6">Contact Information</h3>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 text-gold">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">Email Us</h4>
                                <p className="text-gray-600">contact@wedlockstudio.com</p>
                                {/* <p className="text-gray-600">support@wedlockstudio.com</p> */}
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 text-gold">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">Call Us</h4>
                                <p className="text-gray-600">+1 (555) 123-4567</p>
                                {/* <p className="text-gray-600">Mon - Fri, 9am - 6pm</p> */}
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 text-gold">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">Service Area</h4>
                                <p className="text-gray-600">Based in Sylhet, Available Globally</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl min-h-[460px] flex flex-col justify-center">
                        {isSent ? (
                            <div className="text-center animate-fade-in-up">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={40} className="text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-black mb-4">Message Sent!</h3>
                                <p className="text-gray-600 mb-8">
                                    Thank you for reaching out. We will get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setIsSent(false)}
                                    className="text-gold font-semibold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form ref={form} onSubmit={sendEmail} className="space-y-6">
                                <div>
                                    <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        id="user_name"
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-gold transition-colors"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        id="user_email"
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-gold transition-colors"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-gold transition-colors"
                                        placeholder="Tell us about your project..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full bg-gold text-black font-bold py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSending ? (
                                        "Sending..."
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
        </section>
    );
}
