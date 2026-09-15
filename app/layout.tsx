import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVA — Life, well made.",
  description: "A considered collection of everyday pieces for the way you live now.",
  metadataBase: new URL("https://nova-goods.vercel.app"),
  openGraph: {
    title: "NOVA — Life, well made.",
    description: "Objects for every good day.",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 922, alt: "NOVA — Life, well made." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA — Life, well made.",
    description: "Objects for every good day.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
