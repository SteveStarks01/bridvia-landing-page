import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BridviaConnect - Bridge Your Career Journey",
  description: "BridviaConnect bridges the gap between ambitious students and top companies. Gain practical experience, build your network, and kickstart your career with structured internship opportunities.",
};

export default function BridviaConnectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}