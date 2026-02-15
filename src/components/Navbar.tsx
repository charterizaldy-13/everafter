'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                '.mobile-nav-item',
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
            );
        }
    }, [isOpen]);

    const navLinks = [
        { label: 'Services', href: '#services' },
        { label: 'Packages', href: '#packages' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Testimonials', href: '#testimonials' },
    ];

    const whatsappLink = 'https://wa.me/62085156214292?text=Halo%20EverAfter,%20aku%20tertarik%20untuk%20konsultasi%20perencanaan%20pernikahan%20dengan%20kalian.';

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-midnight/90 backdrop-blur-lg py-4'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="relative z-10">
                        <Image
                            src="/logo-white.png"
                            alt="EverAfter Wedding Organizer"
                            width={200}
                            height={80}
                            className="w-32 md:w-40 h-auto"
                            priority
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-ivory/70 hover:text-lime text-sm font-medium tracking-wider uppercase transition-colors duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-sm py-3 px-6"
                        >
                            Let&apos;s Talk
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-6 h-0.5 bg-ivory transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-ivory transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-ivory transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
                                }`}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-midnight transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="mobile-nav-item text-ivory text-3xl font-serif tracking-tight hover:text-lime transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-nav-item btn-primary text-base mt-4"
                        onClick={() => setIsOpen(false)}
                    >
                        Let&apos;s Talk
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
