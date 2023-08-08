import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/etc/GoogleAnalytics";
import Provider from "@/components/etc/Provider";
import Header from "@/components/basic-layout/HeaderNew";
import Footer from "@/components/basic-layout/Footer";
import Navbar from "@/components/basic-layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      {/* <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID!} /> */}
      <Provider>
        <body className={inter.className}>
          {children}
        </body>
      </Provider>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "무피 - 3D 크리에이터를 위한 포트폴리오",
    template: "%s | 무피",
  },
  description: "무피는 3D 뷰어 기반의 크리에이터 포트폴리오 서비스입니다.",
  applicationName: "무피",
  keywords: [
    "3D",
    "크리에이터",
    "포트폴리오",
    "무피",
    "메타버스",
    "Creator",
    "Portfolio",
    "Moopi",
    "VRChat",
    "VRM",
    "VRC",
  ],
  metadataBase: new URL("https://moopi.offing.me/"),
  openGraph: {
    title: "무피",
    description: "3D 크리에이터를 위한 포트폴리오",
    url: "https://moopi.offing.me/",
    siteName: "무피",
    images: [
      {
        url: "https://moopi.offing.me/og-image.png",
        width: 600,
        height: 800,
        alt: "무피",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
};
