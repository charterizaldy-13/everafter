'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        alt: 'Wedding ceremony',
        span: 'col-span-2 row-span-2',
    },
    {
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
        alt: 'Wedding rings',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
        alt: 'Wedding couple',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
        alt: 'Wedding decoration',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
        alt: 'Wedding flowers',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
        alt: 'Wedding dance',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
        alt: 'Wedding moments',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80',
        alt: 'Wedding celebration',
        span: 'col-span-2 row-span-1',
    },
];

const Gallery = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const headline = headlineRef.current;
        if (!section) return;

        // Animate headline words
        if (headline) {
            const words = ['Visual', 'Storytelling'];
            const italicWords = ['Storytelling'];

            headline.innerHTML = words.map((word, i) => {
                const isItalic = italicWords.includes(word);
                return `<span class="inline-block overflow-hidden"><span class="gallery-word inline-block ${isItalic ? 'italic' : ''}" style="transform: translateY(100%)">${word}</span></span>${i < words.length - 1 ? ' ' : ''}`;
            }).join('');

            gsap.to(headline.querySelectorAll('.gallery-word'), {
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

        const images = section.querySelectorAll('.gallery-item');

        images.forEach((img, index) => {
            gsap.fromTo(
                img,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: img,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="gallery"
            className="relative bg-midnight py-32 md:py-40"
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
                    <div>
                        <span className="text-lime text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                            (GALLERY)
                        </span>
                        <h2
                            ref={headlineRef}
                            className="font-serif text-ivory text-4xl md:text-6xl lg:text-7xl font-medium leading-tight"
                        >
                            Visual <em className="italic">Storytelling</em>
                        </h2>
                    </div>
                    <a
                        href="https://instagram.com/everafterorganizer.id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-ivory/60 hover:text-lime transition-colors"
                    >
                        <span className="text-sm tracking-wide">View on Instagram</span>
                        <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
                    {galleryImages.map((image, index) => (
                        <div
                            key={index}
                            className={`gallery-item relative overflow-hidden rounded-2xl md:rounded-3xl ${image.span} cursor-pointer`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className={`object-cover transition-transform duration-700 ${hoveredIndex === index ? 'scale-110' : 'scale-100'
                                    }`}
                            />
                            {/* Overlay */}
                            <div
                                className={`absolute inset-0 bg-midnight/50 transition-opacity duration-300 flex items-end p-6 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <span className="text-ivory text-sm font-medium">{image.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16 md:mt-20">
                    <p className="text-ivory/60 text-lg mb-4">
                        Each wedding is unique, just like your love story.
                    </p>
                    <a
                        href="https://instagram.com/everafterorganizer.id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lime hover:underline"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        <span>@everafterorganizer.id</span>
                    </a>
                </div>
            </div>
        </section >
    );
};

export default Gallery;
