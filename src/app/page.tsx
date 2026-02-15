'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Packages from '@/components/sections/Packages';
import Gallery from '@/components/sections/Gallery';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/sections/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

// Dynamic imports for client-only components
const SmoothScrollProvider = dynamic(
  () => import('@/components/SmoothScrollProvider'),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Services - Horizontal Scroll */}
        <Services />

        {/* Wedding Packages - Bento Grid */}
        <Packages />

        {/* Aesthetic Gallery */}
        <Gallery />

        {/* Our Team */}
        <Team />

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky WhatsApp Button */}
      <WhatsAppButton />
    </SmoothScrollProvider>
  );
}
