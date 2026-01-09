import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "복지 레이더 | 복지 사각지대 발굴 시스템",
  description: "AI 기반 복지 사각지대 발굴 및 선제적 복지 지원 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
