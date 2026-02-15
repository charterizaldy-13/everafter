import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EverAfter Wedding Organizer | Where Your Forever After Begins",
  description: "Premium wedding planning and coordination services in Jakarta & South Tangerang. We transform your wedding dreams into beautiful realities. Full planning, day-of coordination, and proposal planning services.",
  keywords: ["wedding organizer", "wedding planner", "Jakarta wedding", "South Tangerang wedding", "wedding coordination", "proposal planning", "wedding decoration", "wedding catering"],
  authors: [{ name: "EverAfter Wedding Organizer" }],
  openGraph: {
    title: "EverAfter Wedding Organizer | Where Your Forever After Begins",
    description: "Premium wedding planning and coordination services. We transform your wedding dreams into beautiful realities.",
    url: "https://everafter.id",
    siteName: "EverAfter Wedding Organizer",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EverAfter Wedding Organizer",
    description: "Premium wedding planning and coordination services in Jakarta & South Tangerang.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-midnight text-ivory min-h-screen">
        {children}
      </body>
    </html>
  );
}
