'use client';

import { ReactNode } from 'react';

interface ModernButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    href?: string;
    onClick?: () => void;
    className?: string;
}

const MagneticButton = ({
    children,
    variant = 'primary',
    href,
    onClick,
    className = '',
}: ModernButtonProps) => {
    const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    px-8 py-4 rounded-full font-medium text-sm uppercase tracking-wider
    transition-all duration-300 ease-out
    overflow-hidden group
  `;

    const variants = {
        primary: `
      bg-lime text-midnight
      hover:brightness-110 hover:shadow-lg hover:shadow-lime/30
      hover:-translate-y-0.5 hover:scale-[1.02]
      active:translate-y-0 active:scale-100 active:shadow-md
    `,
        secondary: `
      bg-transparent text-ivory border border-ivory/30
      hover:border-lime hover:text-lime hover:bg-lime/5
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={combinedStyles}
            >
                {/* Hover shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>
            </a>
        );
    }

    return (
        <button onClick={onClick} className={combinedStyles}>
            {/* Hover shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </button>
    );
};

export default MagneticButton;
