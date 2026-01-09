import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/components/layout";

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
