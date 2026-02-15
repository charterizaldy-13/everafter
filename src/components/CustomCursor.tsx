'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Smooth cursor animation
    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;

      gsap.set(cursor, {
        x: cursorX - 20,
        y: cursorY - 20,
      });

      gsap.set(cursorDot, {
        x: mouseX - 4,
        y: mouseY - 4,
      });

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .interactive, .bento-card, .image-reveal'
    );

    const handleElementEnter = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementEnter);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  // Refresh interactive elements on route change
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], .interactive, .bento-card, .image-reveal'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isHovering ? 1.8 : 1})`,
        }}
      >
        <div
          className="w-full h-full rounded-full border-2 transition-all duration-300"
          style={{
            borderColor: isHovering ? '#D4FF00' : '#F5F5F0',
            backgroundColor: isHovering ? 'rgba(212, 255, 0, 0.1)' : 'transparent',
          }}
        />
      </div>
      
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="w-full h-full rounded-full transition-all duration-200"
          style={{
            backgroundColor: isHovering ? '#D4FF00' : '#F5F5F0',
            transform: `scale(${isHovering ? 0 : 1})`,
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
