'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadlineRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const whatsappLink = 'https://wa.me/62085156214292?text=Halo%20EverAfter,%20aku%20tertarik%20untuk%20konsultasi%20perencanaan%20pernikahan%20dengan%20kalian.';

    useEffect(() => {
        const section = sectionRef.current;
        const headline = headlineRef.current;
        const subheadline = subheadlineRef.current;
        const cta = ctaRef.current;

        if (!section || !headline || !subheadline || !cta) return;

        // Initial state
        gsap.set([headline, subheadline, cta], {
            opacity: 0,
            y: 60,
        });

        // Create timeline for entrance animation
        const tl = gsap.timeline({ delay: 0.5 });

        // Define headline lines for animation
        const lines = [
            { text: 'THE ART OF', italics: ['ART'] },
            { text: 'YOUR FOREVER STORY', italics: ['FOREVER'] },
        ];

        // Build headline HTML with proper line breaks
        headline.innerHTML = lines
            .map((line, lineIndex) => {
                const words = line.text.split(' ');
                const lineHtml = words
                    .map((word, i) => {
                        const isItalic = line.italics.includes(word);
                        return `<span class="inline-block overflow-hidden"><span class="hero-word inline-block ${isItalic ? 'italic' : ''}" style="transform: translateY(100%)">${word}</span></span>${i < words.length - 1 ? ' ' : ''}`;
                    })
                    .join('');
                return lineHtml + (lineIndex < lines.length - 1 ? '<br />' : '');
            })
            .join('');

        const heroWords = headline.querySelectorAll('.hero-word');

        tl.set(headline, { opacity: 1, y: 0 })
            .to(heroWords, {
                y: '0%',
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
            })
            .to(
                subheadline,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                },
                '-=0.4'
            )
            .to(
                cta,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                },
                '-=0.4'
            );

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === section) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
        >
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source
                        src="/hero-video.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
                <h1
                    ref={headlineRef}
                    className="font-serif font-semibold text-ivory leading-tight tracking-tight mb-8"
                    style={{ fontSize: 'clamp(2.5rem, 10vw, 7rem)', letterSpacing: '-0.03em', lineHeight: '1.1' }}
                >
                    THE ART OF <br />YOUR FOREVER STORY
                </h1>

                <p
                    ref={subheadlineRef}
                    className="font-sans text-ivory/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed"
                >
                    Where your &apos;forever after&apos; story begins. No drama, just dreams.
                </p>

                <div ref={ctaRef}>
                    <MagneticButton href={whatsappLink} variant="primary">
                        <span>Let&apos;s Make Magic</span>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </MagneticButton>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
                <span className="text-ivory/50 text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-ivory/50 to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
