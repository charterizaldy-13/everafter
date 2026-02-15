'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const allInPackages = [
    {
        tier: 'SILVER',
        price: 'Rp 45.000.000',
        description: 'Perfect for intimate celebrations',
        features: [
            'Venue (Gelagah Puri)',
            'Catering 200 pax',
            'Standard Decoration',
            'Sound System & Lighting',
            'Wedding Organizer',
            'Documentation (Photo)',
        ],
        highlighted: false,
    },
    {
        tier: 'GOLD',
        price: 'Rp 65.000.000',
        description: 'Our most popular choice',
        features: [
            'Venue (Gelagah Puri)',
            'Catering 300 pax',
            'Premium Decoration',
            'Live Music Entertainment',
            'Full Wedding Organizer',
            'Photo & Video Documentation',
            'Bridal Makeup & Attire',
        ],
        highlighted: true,
    },
    {
        tier: 'PLATINUM',
        price: 'Rp 95.000.000',
        description: 'The ultimate celebration',
        features: [
            'Venue (Gelagah Puri)',
            'Catering 500 pax',
            'Luxury Decoration',
            'Full Band Entertainment',
            'Premium Wedding Organizer',
            'Cinematic Photo & Video',
            'Designer Bridal Package',
            'Pre-wedding Photoshoot',
        ],
        highlighted: false,
    },
];

const servicePackages = [
    {
        tier: 'ESSENTIAL',
        price: 'Rp 15.000.000',
        description: 'Coordination essentials',
        features: [
            'Day-of Coordination',
            'Vendor Management',
            'Timeline Planning',
            'Basic Decoration Setup',
        ],
        highlighted: false,
    },
    {
        tier: 'AESTHETIC',
        price: 'Rp 25.000.000',
        description: 'Full planning support',
        features: [
            'Full Planning Service',
            'Vendor Selection & Management',
            'Budget Management',
            'Premium Decoration',
            'Guest Coordination',
        ],
        highlighted: true,
    },
    {
        tier: 'EXTRAVAGANT',
        price: 'Rp 40.000.000',
        description: 'Luxury experience',
        features: [
            'Complete Wedding Planning',
            'Exclusive Vendor Network',
            'Unlimited Consultations',
            'Luxury Decoration',
            'VIP Guest Experience',
            'Post-event Coordination',
        ],
        highlighted: false,
    },
];

const addons = [
    {
        name: 'Photobooth',
        price: '+Rp 3.500.000',
        icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>
    },
    {
        name: 'Audio Guestbook',
        price: '+Rp 2.000.000',
        icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
    },
    {
        name: 'Video 360°',
        price: '+Rp 5.000.000',
        icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
    },
    {
        name: 'Premium Lighting',
        price: '+Rp 4.000.000',
        icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
    },
    {
        name: 'Car Decoration',
        price: '+Rp 1.500.000',
        icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
    },
];

interface PackageCardProps {
    tier: string;
    price: string;
    description: string;
    features: string[];
    highlighted: boolean;
    index: number;
}

const PackageCard = ({ tier, price, description, features, highlighted, index }: PackageCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
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
    }, [index]);

    const whatsappLink = `https://wa.me/62085156214292?text=Halo%20EverAfter,%20saya%20tertarik%20dengan%20paket%20${tier}`;

    return (
        <div
            ref={cardRef}
            className={`group relative p-8 md:p-10 rounded-3xl cursor-pointer
                transition-all duration-500 ease-out
                transform hover:-translate-y-4 hover:scale-[1.02]
                bg-midnight-light border border-midnight-border hover:border-lime/40 hover:shadow-2xl hover:shadow-lime/10
                flex flex-col h-full
                `}
        >

            {/* Tier & Price */}
            <div className="mb-8">
                <span className="text-ivory/50 text-xs tracking-[0.2em] uppercase block mb-2">
                    {tier}
                </span>
                <div className="flex items-baseline gap-2">
                    <span className="font-sans text-ivory text-3xl md:text-4xl font-semibold">
                        {price}
                    </span>
                </div>
                <p className="text-ivory/50 text-sm mt-2">{description}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-midnight-border mb-8" />

            {/* Features */}
            <ul className="space-y-4 mb-10 flex-grow">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-ivory/80 text-sm">
                        <svg
                            className="w-5 h-5 text-lime flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <div className="mt-auto">
                <MagneticButton
                    href={whatsappLink}
                    variant="secondary"
                    className="w-full justify-center"
                >
                    Choose {tier}
                </MagneticButton>
            </div>
        </div>
    );
};

const Packages = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const headline = headlineRef.current;
        if (!headline) return;

        const words = ['Wedding', 'Packages'];
        const italicWords = ['Packages'];

        headline.innerHTML = words.map((word, i) => {
            const isItalic = italicWords.includes(word);
            return `<span class="inline-block overflow-hidden"><span class="packages-word inline-block ${isItalic ? 'italic' : ''}" style="transform: translateY(100%)">${word}</span></span>${i < words.length - 1 ? ' ' : ''}`;
        }).join('');

        gsap.to(headline.querySelectorAll('.packages-word'), {
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

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="packages"
            className="relative bg-midnight py-32 md:py-40"
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-20 md:mb-28">
                    <span className="text-lime text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                        (PRICING)
                    </span>
                    <h2
                        ref={headlineRef}
                        className="font-serif text-ivory text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6"
                    >
                        Wedding <em className="italic">Packages</em>
                    </h2>
                    <p className="text-ivory/60 text-lg max-w-2xl mx-auto">
                        Transparent pricing, no hidden fees. Choose the package that fits your dream celebration.
                    </p>
                </div>

                {/* All-In Package */}
                <div className="mb-24 md:mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="text-lime/40 text-5xl font-light">01</span>
                        <div>
                            <h3 className="font-serif text-ivory text-2xl md:text-3xl font-medium">
                                All In Package
                            </h3>
                            <span className="text-ivory/50 text-sm">Gelagah Puri Venue</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allInPackages.map((pkg, index) => (
                            <PackageCard key={pkg.tier} {...pkg} index={index} />
                        ))}
                    </div>
                </div>

                {/* Service Package */}
                <div className="mb-24 md:mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="text-lime/40 text-5xl font-light">02</span>
                        <div>
                            <h3 className="font-serif text-ivory text-2xl md:text-3xl font-medium">
                                Wedding Service Package
                            </h3>
                            <span className="text-ivory/50 text-sm">Your Venue, Our Magic</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {servicePackages.map((pkg, index) => (
                            <PackageCard key={pkg.tier} {...pkg} index={index} />
                        ))}
                    </div>
                </div>

                {/* Add-ons */}
                <div className="relative overflow-hidden rounded-3xl border border-midnight-border bg-gradient-to-br from-midnight-light to-midnight p-8 md:p-12">
                    {/* Background glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-lime/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-lime/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-12 rounded-2xl bg-lime/10 flex items-center justify-center">
                                <span className="text-lime text-2xl">+</span>
                            </div>
                            <div>
                                <h3 className="font-serif text-ivory text-2xl md:text-3xl font-medium">
                                    Add-ons Available
                                </h3>
                                <p className="text-ivory/50 text-sm mt-1">Enhance your wedding experience</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {addons.map((addon) => (
                                <div
                                    key={addon.name}
                                    className="group relative flex flex-col items-center text-center p-6 rounded-2xl
                                        bg-midnight/50 backdrop-blur-sm border border-midnight-border
                                        hover:border-lime/50 hover:bg-lime/5
                                        transition-all duration-300 cursor-pointer
                                        hover:-translate-y-2 hover:shadow-lg hover:shadow-lime/10"
                                >
                                    <div className="text-lime mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {addon.icon}
                                    </div>
                                    <span className="text-ivory font-medium text-sm mb-2">{addon.name}</span>
                                    <span className="text-lime text-xs font-semibold">{addon.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Packages;
