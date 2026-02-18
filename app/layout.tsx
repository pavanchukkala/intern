import type { Metadata } from 'next'
import AdInit from "../components/AdInit";
import Script from "next/script";
import './globals.css'

export const metadata: Metadata = {
  title: 'kegth | The Ultimate Internship & Career Growth Platform',
  description:
    'Find top internships in tech (AI, ML, full-stack, cybersecurity, data science), medical fields (pulmonology, cardiology, biotech), and business (finance, marketing, HR). Kegth connects students and professionals with industry-leading companies for career growth.',
  keywords: [
    'kegth', 'internsship', 'intern-s-ship', 'internship platform', 'best internship site',
    'internships', 'paid internships', 'free internships', 'remote internships', 'online internships',
    'summer internships', 'part-time internships', 'full-time internships', 'internship portal',
    'software internships', 'AI internship', 'ML internship', 'full-stack internship', 'frontend internship',
    'backend internship', 'cybersecurity internship', 'blockchain internship', 'cloud computing internship',
    'devops internship', 'big data internship', 'quantum computing internship',
    'medical internships', 'pulmonology internship', 'cardiology internship', 'biotech internship',
    'pharmacy internship', 'clinical research internship', 'nursing internship', 'healthcare internship',
    'business internships', 'finance internship', 'marketing internship', 'HR internship', 'law internship',
    'data science internship', 'analytics internship', 'UI/UX internship',
    'internship certificate', 'internship experience', 'internship training', 'internship for students',
    'internship with stipend', 'internship opportunities in India', 'internship abroad',
    'internship in USA', 'internship in UK', 'internship in Germany', 'internship in India', 'internship near me'
  ],
  alternates: {
    canonical: 'https://www.kegth.com',
  },
  openGraph: {
    title: 'kegth | Find Top Internships & Career Opportunities',
    description:
      'Kegth is the leading internship platform offering opportunities in AI, ML, full-stack development, healthcare, business, and more.',
    url: 'https://www.kegth.com',
    siteName: 'kegth',
    images: [
      {
        url: 'https://www.kegth.com/favicon-32x32.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourTwitterHandle',
    title: 'kegth | Best Internship Platform for Career Growth',
    description:
      'Find paid and free internships in tech, medical, and business fields. Kegth connects students and professionals with top companies.',
    images: [
      'https://www.kegth.com/favicon-32x32.png',
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: 'https://www.kegth.com/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {/* 7searchppc Ad Initialization & Scripts */}
        <AdInit />

        {/* Load all 7searchppc ad libraries (non-blocking) */}
        <Script src="https://code.adclickppc.com/7s-popunder.js" strategy="afterInteractive" />
        <Script src="https://code.adclickppc.com/7s-social-ad.js" strategy="afterInteractive" />
        <Script src="https://code.adclickppc.com/7s-native-ad.js" strategy="afterInteractive" />
        <Script src="https://code.adclickppc.com/7s-banner-ad.js" strategy="afterInteractive" />
        <Script src="https://code.adclickppc.com/7s-text-ad.js" strategy="afterInteractive" />

        {/* Popunder Ad Container (hidden, global) */}
        <div 
          id="7SAD1569931FE9A3CA4" 
          data-7pub="7SAD1569931FE9A3CA4" 
          style={{ display: 'none' }} 
        />

        {children}
      </body>
    </html>
  );
}
