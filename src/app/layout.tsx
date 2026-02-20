import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://chaiyot.dev"),
  title: "Chaiyot Mali-ngam - Back-end Developer & DevOps Engineer",
  description: "Portfolio of Chaiyot Mali-ngam, a Back-end Developer and DevOps Engineer.",
  keywords: ["Back-end Developer", "DevOps Engineer", "Spring Boot", "Kubernetes", "Docker", "Chaiyot Mali-ngam", "Portfolio"],
  authors: [{ name: "Chaiyot Mali-ngam" }],
  openGraph: {
    title: "Chaiyot Mali-ngam - Back-end Developer & DevOps Engineer",
    description: "Portfolio of Chaiyot Mali-ngam, with experience in Spring Boot and DevOps.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Chaiyot Portfolio",
    images: [
      {
        url: "/favicon.svg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaiyot Mali-ngam - Back-end Developer & DevOps Engineer",
    description: "Portfolio of Chaiyot Mali-ngam, with experience in Spring Boot and DevOps.",
    images: ["/favicon.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chaiyot Mali-ngam",
  jobTitle: "Back-end Developer and DevOps Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  sameAs: [
    "https://github.com/chaiyotmg",
    "https://www.linkedin.com/in/chaiyot-mali-ngam"
  ],
  description: "Back-end Developer and DevOps Engineer with experience in Spring Boot, Kubernetes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.variable} font-mono antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
