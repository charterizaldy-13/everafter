'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: 'Rina & Adi',
        date: 'December 2024',
        quote:
            'EverAfter turned our dream wedding into reality. Every detail was perfect, from the flowers to the music. We couldn\'t have asked for a better team!',
        rating: 5,
    },
    {
        name: 'Sarah & Budi',
        date: 'November 2024',
        quote:
            'Professional, creative, and so easy to work with. They understood our vision from day one and exceeded all expectations.',
        rating: 5,
    },
    {
        name: 'Maya & Rizky',
        date: 'October 2024',
        quote:
            'From the proposal planning to the wedding day, EverAfter was there every step. The team is amazing and truly cares about making your day special.',
        rating: 5,
    },
    {
        name: 'Dian & Fajar',
        date: 'September 2024',
        quote:
            'We were so stressed about planning until we found EverAfter. They took care of everything and let us actually enjoy the process.',
        rating: 5,
    },
];

const Testimonials = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const headline = headlineRef.current;
        if (!section) return;

        // Animate headline words
        if (headline) {
            const words = ['The', 'Real', 'Talk'];
            const italicWords = ['Real'];

            headline.innerHTML = words.map((word, i) => {
                const isItalic = italicWords.includes(word);
                return `<span class="inline-block overflow-hidden"><span class="testimonials-word inline-block ${isItalic ? 'italic' : ''}" style="transform: translateY(100%)">${word}</span></span>${i < words.length - 1 ? ' ' : ''}`;
            }).join('');

            gsap.to(headline.querySelectorAll('.testimonials-word'), {
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

        cardsRef.current.forEach((card, index) => {
            if (!card) return;

            gsap.fromTo(
                card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
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
            id="testimonials"
            className="relative bg-midnight py-32 md:py-40"
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-20 md:mb-28">
                    <span className="text-lime text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                        (TESTIMONIALS)
                    </span>
                    <h2
                        ref={headlineRef}
                        className="font-serif text-ivory text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6"
                    >
                        The <em className="italic">Real</em> Talk
                    </h2>
                    <p className="text-ivory/60 text-lg max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our couples have to say.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            ref={(el) => { if (el) cardsRef.current[index] = el; }}
                            className="bg-midnight-light rounded-3xl border border-midnight-border p-8 md:p-10 hover:border-ivory/20 transition-colors duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-lime" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-ivory text-lg md:text-xl leading-relaxed mb-8 font-light">
                                "{testimonial.quote}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-ivory font-medium">{testimonial.name}</p>
                                    <p className="text-ivory/50 text-sm">{testimonial.date}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-lime/10 flex items-center justify-center">
                                    <span className="text-lime text-lg">❤</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-28 pt-12 border-t border-midnight-border">
                    <div className="text-center">
                        <span className="text-lime text-4xl md:text-5xl font-sans font-semibold block mb-2">150+</span>
                        <span className="text-ivory/60 text-sm uppercase tracking-wider">Weddings</span>
                    </div>
                    <div className="text-center">
                        <span className="text-lime text-4xl md:text-5xl font-sans font-semibold block mb-2">5.0</span>
                        <span className="text-ivory/60 text-sm uppercase tracking-wider">Rating</span>
                    </div>
                    <div className="text-center">
                        <span className="text-lime text-4xl md:text-5xl font-sans font-semibold block mb-2">100%</span>
                        <span className="text-ivory/60 text-sm uppercase tracking-wider">Happy Couples</span>
                    </div>
                    <div className="text-center">
                        <span className="text-lime text-4xl md:text-5xl font-sans font-semibold block mb-2">3+</span>
                        <span className="text-ivory/60 text-sm uppercase tracking-wider">Years</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
