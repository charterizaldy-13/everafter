'use client';

import { useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
    children: ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
    useEffect(() => {
        // Just setup ScrollTrigger without Lenis for native scroll (no delay)
        ScrollTrigger.defaults({
            markers: false,
        });

        // Refresh ScrollTrigger on resize
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScrollProvider;
