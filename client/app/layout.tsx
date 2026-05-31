import type { Metadata } from "next";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Ticket Insight Engine",
    template: "%s | Ticket Insight Engine",
  },

  description:
    "AI-powered ticket clustering and insight generation platform for analyzing support tickets, identifying patterns, and creating actionable reports.",

  keywords: [
    "Ticket Insight Engine",
    "AI ticket analysis",
    "ticket clustering",
    "support analytics",
    "customer support",
    "Next.js",
    "AI insights",
  ],

  authors: [
    {
      name: "Priyanshu Chaurasiya",
    },
  ],

  creator: "Priyanshu Chaurasiya",

  openGraph: {
    title: "Ticket Insight Engine",
    description:
      "Analyze, cluster, and generate insights from support tickets using AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
