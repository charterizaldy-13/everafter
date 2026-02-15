'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamImages = [
    { src: '/team-1.jpg', alt: 'EverAfter Team - Professional Portrait' },
    { src: '/team-2.jpg', alt: 'EverAfter Team - Studio Session' },
    { src: '/team-3.jpg', alt: 'EverAfter Team - Traditional Kebaya' },
    { src: '/team-4.jpg', alt: 'EverAfter Team - Casual Moment' },
];

const Team = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        const headline = headlineRef.current;
        if (!section) return;

        // Animate headline words
        if (headline) {
            const words = ['The', 'Dreamweavers'];
            const italicWords = ['Dreamweavers'];

            headline.innerHTML = words.map((word, i) => {
                const isItalic = italicWords.includes(word);
                return `<span class="inline-block overflow-hidden"><span class="team-word inline-block ${isItalic ? 'italic' : ''}" style="transform: translateY(100%)">${word}</span></span>${i < words.length - 1 ? ' ' : ''}`;
            }).join('');

            gsap.to(headline.querySelectorAll('.team-word'), {
                y: '0%',
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headline,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        }

        // Animate header
        gsap.fromTo(
            section.querySelector('.team-header'),
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Animate gallery
        gsap.fromTo(
            section.querySelector('.team-gallery'),
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="team"
            className="relative bg-midnight py-32 md:py-40 overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <div className="team-header grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 md:mb-24">
                    <div>
                        <span className="text-lime text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                            (OUR TEAM)
                        </span>
                        <h2
                            ref={headlineRef}
                            className="font-serif text-ivory text-4xl md:text-6xl lg:text-7xl font-medium leading-tight"
                        >
                            The <em className="italic">Dreamweavers</em>
                        </h2>
                    </div>
                    <div className="flex flex-col justify-end">
                        <p className="text-ivory/60 text-lg leading-relaxed mb-6">
                            We are a passionate and dedicated team committed to making your
                            special day unforgettable. With experience from over 150+ weddings,
                            we understand that every small detail carries great meaning.
                        </p>
                        <p className="text-ivory/60 text-lg leading-relaxed">
                            From initial concept to flawless execution, we are here as your
                            partner to ensure every moment runs perfectly.
                            <span className="text-lime"> Your stress is our job.</span>
                        </p>
                    </div>
                </div>

                {/* Gallery - Bento Grid Layout */}
                <div className="team-gallery grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {/* Large main image */}
                    <div
                        className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden cursor-pointer group"
                        onClick={() => setActiveIndex(0)}
                    >
                        <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
                            <Image
                                src={teamImages[0].src}
                                alt={teamImages[0].alt}
                                fill
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>

                    {/* Top right image */}
                    <div
                        className="col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group"
                        onClick={() => setActiveIndex(1)}
                    >
                        <div className="relative w-full h-full min-h-[200px] md:min-h-[240px]">
                            <Image
                                src={teamImages[1].src}
                                alt={teamImages[1].alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                style={{ objectPosition: '50% 25%' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>

                    {/* Bottom right images - 2 small */}
                    <div
                        className="relative rounded-3xl overflow-hidden cursor-pointer group"
                        onClick={() => setActiveIndex(2)}
                    >
                        <div className="relative w-full h-full min-h-[200px] md:min-h-[240px]">
                            <Image
                                src={teamImages[2].src}
                                alt={teamImages[2].alt}
                                fill
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>

                    <div
                        className="relative rounded-3xl overflow-hidden cursor-pointer group"
                        onClick={() => setActiveIndex(3)}
                    >
                        <div className="relative w-full h-full min-h-[200px] md:min-h-[240px]">
                            <Image
                                src={teamImages[3].src}
                                alt={teamImages[3].alt}
                                fill
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                </div>

                {/* Team Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 md:mt-28 pt-12 border-t border-midnight-border">
                    <div className="text-center md:text-left">
                        <div className="w-12 h-12 rounded-2xl bg-lime/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                            <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-ivory text-xl font-medium mb-2">Passionate</h3>
                        <p className="text-ivory/50 text-sm">
                            We love what we do, and it shows in every detail we touch.
                        </p>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="w-12 h-12 rounded-2xl bg-lime/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                            <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-ivory text-xl font-medium mb-2">Professional</h3>
                        <p className="text-ivory/50 text-sm">
                            Our experience and dedication guarantee the best quality service for you.
                        </p>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="w-12 h-12 rounded-2xl bg-lime/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                            <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                        </div>
                        <h3 className="font-serif text-ivory text-xl font-medium mb-2">Creative</h3>
                        <p className="text-ivory/50 text-sm">
                            Every wedding is a new canvas for our creative ideas.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
