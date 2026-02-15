'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadingProps {
    children: ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    className?: string;
    delay?: number;
    stagger?: number;
    splitType?: 'chars' | 'words' | 'lines';
    animation?: 'fadeUp' | 'fadeIn' | 'slideUp' | 'reveal';
    triggerOnScroll?: boolean;
}

const AnimatedHeading = ({
    children,
    as: Tag = 'h2',
    className = '',
    delay = 0,
    stagger = 0.03,
    splitType = 'chars',
    animation = 'fadeUp',
    triggerOnScroll = true,
}: AnimatedHeadingProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const textElement = textRef.current;
        if (!container || !textElement) return;

        // Split text into spans
        const text = textElement.textContent || '';
        let elements: string[] = [];

        if (splitType === 'chars') {
            elements = text.split('');
        } else if (splitType === 'words') {
            elements = text.split(' ');
        } else {
            elements = [text];
        }

        // Create wrapped elements
        textElement.innerHTML = elements
            .map((el, i) => {
                const char = el === ' ' ? '&nbsp;' : el;
                return `<span class="inline-block overflow-hidden"><span class="animated-char inline-block" style="display: inline-block">${char}</span></span>${splitType === 'words' && i < elements.length - 1 ? '&nbsp;' : ''}`;
            })
            .join('');

        const chars = textElement.querySelectorAll('.animated-char');

        // Set initial state based on animation type
        const initialState = {
            fadeUp: { y: '100%', opacity: 0 },
            fadeIn: { opacity: 0 },
            slideUp: { y: '100%' },
            reveal: { y: '100%', opacity: 0, rotateX: 90 },
        };

        const animatedState = {
            fadeUp: { y: '0%', opacity: 1 },
            fadeIn: { opacity: 1 },
            slideUp: { y: '0%' },
            reveal: { y: '0%', opacity: 1, rotateX: 0 },
        };

        gsap.set(chars, initialState[animation]);

        const tl = gsap.timeline({
            scrollTrigger: triggerOnScroll
                ? {
                    trigger: container,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                }
                : undefined,
        });

        tl.to(chars, {
            ...animatedState[animation],
            duration: 0.8,
            ease: 'power3.out',
            stagger: stagger,
            delay: delay,
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [animation, delay, splitType, stagger, triggerOnScroll, children]);

    return (
        <div ref={containerRef} className="overflow-hidden">
            <Tag className={className}>
                <span ref={textRef}>{children}</span>
            </Tag>
        </div>
    );
};

export default AnimatedHeading;
