'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        number: '01',
        title: 'THE FULL MONTY',
        subtitle: 'Complete Wedding Planning',
        description:
            'From initial concept to the final farewell, we handle every intricate detail. Dream big—we\'ll make it happen.',
        features: ['Venue Selection', 'Vendor Coordination', 'Timeline Management', 'Budget Planning'],
    },
    {
        number: '02',
        title: 'DAY-OF HERO',
        subtitle: 'Wedding Coordination',
        description:
            'You\'ve planned it all, now let us execute it flawlessly. We show up, take charge, and ensure magic unfolds.',
        features: ['Day-of Coordination', 'Vendor Management', 'Emergency Handling', 'Guest Experience'],
    },
    {
        number: '03',
        title: 'THE PROPOSAL',
        subtitle: 'Proposal Planning',
        description:
            'Pop the question in the most unforgettable way. Let us craft a moment they\'ll say yes to forever.',
        features: ['Location Scouting', 'Surprise Coordination', 'Photography Setup', 'Romantic Details'],
    },
];

const Services = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);
    const headlineRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const headline = headlineRef.current;
        if (!section) return;

        // Animate headline words
        if (headline) {
            const line1Words = ['What', 'We', 'Bring'];
            const line2Words = ['to', 'Your', 'Special', 'Day'];
            const italicWords = ['Bring', 'Special'];

            // Build HTML with word spans
            const buildLine = (words: string[]) => {
                return words.map((word, i) => {
                    const isItalic = italicWords.includes(word);
                    return `<span class="inline-block overflow-hidden"><span class="services-word inline-block ${isItalic ? 'italic' : ''}" style="transform: translateY(100%)">${word}</span></span>${i < words.length - 1 ? ' ' : ''}`;
                }).join('');
            };

            headline.innerHTML = `
                <span class="block">${buildLine(line1Words)}</span>
                <span class="block">${buildLine(line2Words)}</span>
            `;

            const servicesWords = headline.querySelectorAll('.services-word');

            gsap.to(servicesWords, {
                y: '0%',
                duration: 1,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headline,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        }

        // Animate each service item on scroll
        itemsRef.current.forEach((item) => {
            if (!item) return;

            gsap.fromTo(
                item,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
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
            id="services"
            className="relative bg-midnight py-32 md:py-40"
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="mb-24 md:mb-32">
                    <span className="text-lime text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                        (SERVICES)
                    </span>
                    <h2
                        ref={headlineRef}
                        className="font-serif text-ivory text-4xl md:text-6xl lg:text-7xl font-medium leading-tight max-w-4xl"
                    >
                        What We <em className="italic">Bring</em>
                        <br />
                        to Your <em className="italic">Special</em> Day
                    </h2>
                </div>

                {/* Services List */}
                <div className="space-y-24 md:space-y-32">
                    {services.map((service, index) => (
                        <div
                            key={service.number}
                            ref={(el) => { if (el) itemsRef.current[index] = el; }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
                        >
                            {/* Number */}
                            <div className="lg:col-span-2">
                                <span className="text-lime/40 text-6xl md:text-8xl font-light">
                                    {service.number}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="lg:col-span-5">
                                <span className="text-ivory/50 text-sm tracking-[0.15em] uppercase mb-3 block">
                                    {service.subtitle}
                                </span>
                                <h3 className="font-serif text-ivory text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
                                    {service.title}
                                </h3>
                                <p className="text-ivory/60 text-lg leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="lg:col-span-5">
                                <div className="border-t border-midnight-border pt-8">
                                    <span className="text-ivory/40 text-xs tracking-[0.2em] uppercase mb-6 block">
                                        INCLUDES
                                    </span>
                                    <ul className="space-y-4">
                                        {service.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="text-ivory text-base flex items-center gap-4"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
