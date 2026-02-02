import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-black pt-10 pb-4 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    {/* Logo */}
                    <div className="mb-8 md:mb-0">
                        <Link href="/" className="relative block w-40 h-12">
                            <Image
                                src="https://res.cloudinary.com/djbh7xuqv/image/upload/q_auto,f_auto/v1770056120/logo_xlkvz7.jpg"
                                alt="WedLockStudio Logo"
                                fill
                                sizes="160px"
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-gray-600 mt-2 text-sm max-w-xs">
                            Professional video editing services for creators, businesses, and couples.
                        </p>

                    </div>

                    {/* Socials */}
                    <div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                                <Linkedin size={24} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                                <Youtube size={24} />
                            </a>

                        </div>
                        <div className="pt-5 text-center text-sm text-gray-500">
                            <p>&copy; {new Date().getFullYear()} WedLockStudio. All rights reserved.</p>
                        </div>
                    </div>


                </div>


            </div>
        </footer>
    );
}
